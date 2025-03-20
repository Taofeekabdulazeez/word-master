import { INotificationMessage } from "@/interfaces";
import { Typography } from "@mui/material";

type NotificationMessageProps = {
  message: INotificationMessage;
};

export function NotificationMessage({ message }: NotificationMessageProps) {
  return (
    <Typography
      variant="body1"
      color="textSecondary"
      align="center"
      fontSize={12}
    >
      {message.text}
    </Typography>
  );
}
