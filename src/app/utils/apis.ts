export const common = '/common';
export const user = '/users';
export const web = '/web';
export const media = '/media';

export const Api = {
    login: `${common}/login`,
    logout: `/logout`,
    imageUplaod: `${media}/UploadFile`,
    changePassword: `/user/changePassword`,
    user: {
        students: {
            studentListing: `/students`,
            getEditStudentById: `/students/studentId`
        },
        instructors: {
            instructorListing: `/instructors`,
        },
        updateStatus: `${user}/userId/status`,
        delete: `${user}`
    },
    occupation: {
        get: `/occupations`,
        status: `/occupations/occId/status`,
        edit: '/occupations/addEditId'
    },
    category: {
        get: '/categories',
        updateStatus: '/categories/catId/status',
        edit: '/categories/addEditId'
    },
    subcategory: {
        get: '/subCategories',
        updateStatus: '/subCategories/catId/status',
        edit: '/subCategories/addEditId'
    },
    education: {
        get: '/educations',
        edit: '/educations/addEditId',
        updateStatus: '/educations/eduId/status'
    },
    banners: {
        get: '/banners',
        updateStatus: '/banners/banId/status',
        edit: '/banners/addEditId'
    },
    courses: {
        get: '/courses',
        getCommon: '/admin/courses',
        getPurchasedCourses: '​/purchasedCourses/students',
        updateStatus: '/course/courseId/status',
        getStudentsEnrolledInCourses: `/course/courseId/enrolledStudents`,
        grantRevokeAccess : `/courses/courseId/enrollment/student/studentId`,
        updateCourseMode: `/course/courseId/courseMode`
    },
    blog: {
        getBlogs: `${common}/articles`,
        blogDetail: `${common}/articles/blogId`,
        addBlog: `/articles`,
        editOrDeleteBlog: `/articles/blogId`,
        comment: {
            getAddComment: `/common/articles/blogId/comments`,
            editDeleteComment: `/articles/blogId/comments/commentId`
        }
    },
    localization: {
        get: `${common}/localization`,
    },
    price: {
        getPriceCurrencies: `/coursePriceCurrencies`,
        getPriceTires: `/coursePriceCurrencies/coursePriceCurrencyId​/priceTiers`
    },
    events: {
        get: `/event`,
        add: `/createEvent`,
        editDelete: `/event/eventId`
    },
    testimonials: {
        get:`${common}/testimonials`,
        addNew:`/studentTestimonial`,
        updateStaus:`/studentTestimonial/studentTestimonialId/status`
    },
    dashBoard: `/admin/homePage`,
    languages: `${common}/languages`,
    setting: `/settings`
};
