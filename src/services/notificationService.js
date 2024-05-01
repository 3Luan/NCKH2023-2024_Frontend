import backendApi from "../api/backendApi";

export const getNotificationsAPI = (currentPage) => {
  return backendApi.get(`/api/notification/getNotifications/${currentPage}`);
};
export const readNotificationAPI = (notificationId) => {
  return backendApi.post(`/api/notification/readNotification`, {
    notificationId,
  });
};
