import {useState} from "react";
import {
    Alert,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControlLabel,
    Radio,
    RadioGroup,
    Stack,
    TextField,
    Typography
} from "@mui/material";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {approveAdv, rejectAdv, updateAdv} from "../api/api.ts";
import {useParams} from "react-router";

const REASONS = [
    "Запрещённый товар",
    "Неверная категория",
    "Некорректное описание",
    "Проблемы с фото",
    "Подозрение на мошенничество",
    "Другое",
];

const ModeratorActions = () => {
    const [actionType, setActionType] = useState<"reject" | "revision" | null>(null)
    const [rejectOpen, setRejectOpen] = useState(false)
    const [reason, setReason] = useState("")
    const [comment, setComment] = useState("")


    const client = useQueryClient()
    const {id} = useParams()

    const {mutate:approveAd} = useMutation({
        mutationFn: () => approveAdv(id ?? ''),
        onSuccess: async () => {
            await client.invalidateQueries({
                queryKey: ['ads:id', id]
            })
            setComment('')
            setReason('')
        },
        onError: err => <Alert severity="error">{err.message}</Alert>,

    })

    const {mutate:rejectAd} = useMutation({
        mutationFn: () => rejectAdv(id ?? '', {reason, comment}),
        onSuccess: async () => {
            await client.invalidateQueries({
                queryKey: ['ads:id', id]
            })
            setComment('')
            setReason('')
        },
        onError: err => <Alert severity="error">{err.message}</Alert>,
    })

    const {mutate:requestAd} = useMutation({
        mutationFn: () => updateAdv(id ?? '', {reason, comment}),
        onSuccess: async () => {
            await client.invalidateQueries({
                queryKey: ['ads:id', id]
            })
            setComment('')
            setReason('')
        },
        onError: err => <Alert severity="error">{err.message}</Alert>,
    })

    return (
        <>
            {/* Кнопки модерации */}
            <Stack direction="row" spacing={2} justifyContent="center">
                <Button variant="contained"
                        color="success"
                        onClick={() => approveAd()}
                >
                    Одобрить
                </Button>

                <Button
                    variant="contained"
                    color="error"
                    onClick={() => {
                        setRejectOpen(true)
                        setActionType("reject")
                    }}
                >
                    Отклонить
                </Button>

                <Button variant="contained"
                        color="warning"
                        onClick={() => {
                            setActionType("revision")
                            setRejectOpen(true)
                        }}
                >
                    На доработку
                </Button>
            </Stack>

            {/* Модалка отклонения */}
            <Dialog
                open={rejectOpen}
                onClose={() => setRejectOpen(false)}
                maxWidth="sm"
                fullWidth
            >
                <DialogTitle> {actionType === "reject"
                    ? "Отклонение объявления"
                    : "Отправка на доработку"}</DialogTitle>

                <DialogContent>
                    <Stack spacing={2}>
                        <Typography variant="body2" color="text.secondary">
                            {actionType === "reject"
                                ? "Укажите причину отклонения (обязательно)"
                                : "Укажите причину отправки на доработку (обязательно)"}
                        </Typography>
                        <RadioGroup
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                        >
                            {REASONS.map((r) => (
                                <FormControlLabel
                                    key={r}
                                    value={r}
                                    control={<Radio />}
                                    label={r}
                                />
                            ))}
                        </RadioGroup>
                        {reason === "Другое" && (
                            <TextField
                                label="Комментарий"
                                multiline
                                minRows={3}
                                placeholder="Опишите причину"
                                value={comment}
                                onChange={(e) =>
                                    setComment(e.target.value)
                                }
                                fullWidth
                            />
                        )}
                    </Stack>
                </DialogContent>

                <DialogActions>
                    <Button
                        onClick={() => setRejectOpen(false)}
                    >
                        Отмена
                    </Button>
                    <Button
                        variant="contained"
                        color="error"
                        disabled={!(reason || comment)}
                        onClick={() => {
                            if (actionType === "reject") {
                                rejectAd()
                            } else {
                                requestAd()
                            }
                            setRejectOpen(false)
                            setActionType(null)
                        }}
                    >
                        Отправить
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default ModeratorActions;
