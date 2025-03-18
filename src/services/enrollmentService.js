// const enrollmentService = {
//   enroll: async ({ courseId, phoneNumber, paymentMethod }) => {
//     return new Promise((resolve) => {
//       setTimeout(() => {
//         resolve({ courseId, phoneNumber, paymentMethod });
//       }, 1000);
//     });
//   },
// };

// export default enrollmentService;

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
