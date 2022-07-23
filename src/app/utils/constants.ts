export const constants = {

    imageType: ['image/jpg', 'image/jpeg', 'image/png'],
    PATTERNS: {
        email: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    },
    STATUS : [
        { name: 'All', value: 'all' },
        { name: 'DRAFT', value: 'draft' },
        { name: 'REJECTED', value: 'rejected' },
        { name: 'UNDER_REVIEW', value: 'under_review' },
        { name: 'APPROVED', value: 'approved' },
      ]
};
