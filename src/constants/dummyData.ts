import {ApplicationCardProps} from '../components/cards/ApplicationCard';
import {ApplicationStatus} from '../components/cards/ApplicationCard';

export const onboardingSlides = [
  {
    titleKey: 'welcome',
    subtitleKey: 'welcome_text_2',
    descriptionKey: 'welcome_text_4',
    image: require('../assets/welcome_screen_1.png'),
  },
  {
    titleKey: 'best_financing_offers',
    subtitleKey: 'your_best_offers',
    descriptionKey: 'get_on_waitlist_msg',
    image: require('../assets/welcome_screen_2.png'),
  },
];

export const dashboardStats = [
  {
    labelKey: 'financing_amount',
    value: '75,000',
    captionKey: 'sar',
  },
  {
    labelKey: 'applications',
    value: '12',
    captionKey: 'current',
  },
  {
    labelKey: 'offers',
    value: '8',
    captionKey: 'available',
  },
];

export type ApplicationItem = ApplicationCardProps;

export const applications: ApplicationItem[] = [
  {
    product: 'Auto Finance',
    company: 'Al Rajhi Bank',
    amount: '120,000',
    status: 'in_process',
    date: 'Oct 20, 2025',
  },
  {
    product: 'Personal Finance',
    company: 'SNB',
    amount: '80,000',
    status: 'on_hold',
    date: 'Oct 12, 2025',
  },
  {
    product: 'Mortgage',
    company: 'Riyad Bank',
    amount: '650,000',
    status: 'completed',
    date: 'Sep 28, 2025',
  },
];

export const offerList = [
  {
    title: 'Auto Finance Plus',
    description: 'Best rate for new vehicles',
    rate: '4.5%',
    tenor: '60 Months',
  },
  {
    title: 'Personal Flex',
    description: 'Quick approval personal loan',
    rate: '6.1%',
    tenor: '36 Months',
  },
];

export type TicketStatus = 'open' | 'awaiting_reply' | 'closed';

export const tickets = [
  {
    id: 'TCK-12345',
    subjectKey: 'subject_title',
    status: 'open' as TicketStatus,
    updatedAt: '2h ago',
  },
  {
    id: 'TCK-12312',
    subjectKey: 'description_title',
    status: 'awaiting_reply' as TicketStatus,
    updatedAt: '1d ago',
  },
];

export const statusFilters: {
  labelKey: string;
  value: ApplicationStatus | 'all';
}[] = [
  {labelKey: 'all', value: 'all'},
  {labelKey: 'in_process', value: 'in_process'},
  {labelKey: 'on_hold', value: 'on_hold'},
  {labelKey: 'completed', value: 'completed'},
  {labelKey: 'rejected', value: 'rejected'},
];

