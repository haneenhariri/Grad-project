import axiosInstance from "./axiosInstance"

export const gitUserSide = async () => 
{
    const response = await axiosInstance.get(`/conversations`);
    console.log(response.data.data);
    return response.data.data;
}
export const gitUser = async () => 
{
    const response = await axiosInstance.get(`/student-instructors`);
    console.log(response.data.data);
    return response.data.data;
}

export const getMessages = async (userId: number) => {
    try {
      const response = await axiosInstance.get(`/chat/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching messages:', error);
      throw error;
    }
  }

export const sendMessageUser = async (receiverId: number, content: string) => {
    try {
      const response = await axiosInstance.post('/messages', {
        received_id: receiverId,
        content
      });
      return response.data;
    } catch (error) {
      console.error('Error sending message:', error);
      throw error;
    }
  }
