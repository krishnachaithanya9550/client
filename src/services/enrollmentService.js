
const enrollmentService = {
  enroll: async ({ courseId, courseTitle, phoneNumber, paymentMethod }) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ courseId, courseTitle, phoneNumber, paymentMethod });
      }, 1000);
    });
  },
};

export default enrollmentService;
