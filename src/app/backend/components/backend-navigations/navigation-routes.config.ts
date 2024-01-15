import { RouteInfo } from './navigation.metadata';

//Sidebar menu Routes and data
export const ROUTES: RouteInfo[] = [
    { path: '/admin/dashboard', title: 'Dashboard', icon: 'bx bx-home', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: []},
    {
        path: '', title: 'About', icon: 'bx bx-info-circle', class: 'sub', badge: '', badgeClass: '', isExternalLink: false, submenu: [
            { path: '/admin/about/', title: 'About Kaigan', icon: 'bx bx-right-arrow-alt', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
            { path: '/admin/about/slider-carousel', title: 'About Slider', icon: 'bx bx-right-arrow-alt', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
            { path: '/admin/about/team-image', title: 'Team Image', icon: 'bx bx-right-arrow-alt', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] }
        ]
    },
    {
        path: '', title: 'Careers', icon: 'bx bx-briefcase-alt-2', class: 'sub', badge: '', badgeClass: '', isExternalLink: false,
        submenu: [
            { path: '/admin/careers/benefit-icon', title: 'Benefit Icon', icon: 'bx bx-right-arrow-alt', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
            { path: '/admin/careers/perks-and-benefit', title: 'Perks & Benefit', icon: 'bx bx-right-arrow-alt', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
            { path: '/admin/careers/featured-job', title: 'Featured Job', icon: 'bx bx-right-arrow-alt', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
            { path: '/admin/careers/group-open-position', title: 'Group Open Position', icon: 'bx bx-right-arrow-alt', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
            { path: '/admin/careers/open-position', title: 'Open Position', icon: 'bx bx-right-arrow-alt', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
            // { path: '/admin/careers/life-at-kaigan', title: 'Life At Kaigan', icon: 'bx bx-right-arrow-alt', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
        ]
    },
    {
        path: '', title: 'Job Application', icon: 'bx bx-user-pin', class: 'sub', badge: '', badgeClass: '', isExternalLink: false,
        submenu: [
            { path: '/admin/job-vacancy/applicant-list', title: 'Applicant List', icon: 'bx bx-right-arrow-alt', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] }
        ]
    },
    {
        path: '', title: 'Games', icon: 'bx bx-joystick', class: 'sub', badge: '', badgeClass: '', isExternalLink: false,
        submenu: [
            { path: '/admin/games/list', title: 'Game Lists', icon: 'bx bx-right-arrow-alt', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
            { path: '/admin/games/video', title: 'Game Videos', icon: 'bx bx-right-arrow-alt', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
            { path: '/admin/games/faq', title: "Game FAQ's", icon: 'bx bx-right-arrow-alt', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] }
        ]
    },
    {
        path: '', title: 'Contact Us', icon: 'bx bx-phone', class: 'sub', badge: '', badgeClass: '', isExternalLink: false,
        submenu: [
            { path: '/admin/contact-us', title: 'Contact Us Data', icon: 'bx bx-right-arrow-alt', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
        ]
    },
    {
        path: '', title: 'Community', icon: 'bx bx-network-chart', class: 'sub', badge: '', badgeClass: '', isExternalLink: false,
        submenu: [
            { path: '/admin/community', title: 'Community', icon: 'bx bx-right-arrow-alt', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
            { path: '/admin/community-highlight/section', title: 'Community Highlight Section', icon: 'bx bx-right-arrow-alt', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
            { path: '/admin/community-highlights', title: 'Community Highlights Item', icon: 'bx bx-right-arrow-alt', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
        ]
    },
    {
        path: '', title: 'Internships', icon: 'bx bx-spa', class: 'sub', badge: '', badgeClass: '', isExternalLink: false,
        submenu: [
            // { path: '/admin/internship/perks', title: 'Internship Perks', icon: 'bx bx-right-arrow-alt', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
            { path: '/admin/internship/slider', title: 'Internship Slider', icon: 'bx bx-right-arrow-alt', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
        ]
    },
    { path: '/admin/testimonials', title: 'Testimonials', icon: 'bx bx-brightness', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: []},
    { path: '/admin/press', title: 'Press', icon: 'bx bx-camera-movie', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: []},
    {
        path: '', title: 'Dev Blog', icon: 'bx bx-code-block', class: 'sub', badge: '', badgeClass: '', isExternalLink: false,
        submenu: [
            { path: '/admin/dev-blog-tabs', title: 'Dev Blog Tabs', icon: 'bx bx-right-arrow-alt', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
            { path: '/admin/dev-blog', title: 'Dev Blog', icon: 'bx bx-right-arrow-alt', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
        ]
    }
];