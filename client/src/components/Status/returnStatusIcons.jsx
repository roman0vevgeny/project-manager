import StatusMapsCheckbox from '../svgs/StatusMapsCheckbox'
import StatusCircleCheckbox from '../svgs/StatusCircleCheckbox'
import StatusTimeCheckbox from '../svgs/StatusTimeCheckbox'
import StatusPauseCheckbox from '../svgs/StausPauseCheckbox'
import StatusMergeCheckbox from '../svgs/StatusMergeCheckbox'
import StatusTestCheckbox from '../svgs/StatusTestCheckbox'
import StatusReviewCheckbox from '../svgs/StatusReviewCheckbox'
import StatusTranslateCheckbox from '../svgs/StatusTranslateCheckbox'
import StatusDiscussCheckbox from '../svgs/StatusDiscussCheckbox'
import Progress from '../svgs/Progress'
import Inprogress from '../svgs/Inprogress'
import StatusRocketCheckbox from '../svgs/StatusRocketCheckbox'
import StatusPhoneCheckbox from '../svgs/StatusPhoneCheckbox'
import StatusEmpty from '../svgs/StatusEmpty'
import StatusInProgress from '../svgs/StatusInProgress'
import Status from '../svgs/Status'
import StatusParameters from '../svgs/StatusParameters'
import StatusMapsIcon from '../svgs/StatusMapsIcon'
import StatusCircleIcon from '../svgs/StatusCircleIcon'
import StatusTimeIcon from '../svgs/StatusTimeIcon'
import StatusPauseIcon from '../svgs/StatusPauseIcon'
import StatusMergeIcon from '../svgs/StatusMergeIcon'
import StatusTestIcon from '../svgs/StatusTestIcon'
import StatusReviewIcon from '../svgs/StatusReviewIcon'
import StatusTranslateIcon from '../svgs/StatusTranslateIcon'
import StatusDiscussIcon from '../svgs/StatusDiscussIcon'
import StatusRocketIcon from '../svgs/StatusRocketIcon'
import StatusPhoneIcon from '../svgs/StatusPhoneIcon'
import StatusGroupIcon from '../svgs/StatusGroupIcon'
import StatusGroupCheckbox from '../svgs/StatusGroupCheckbox'
import StatusDotCheckbox from '../svgs/StatusDotCheckbox'
import StatusDotIcon from '../svgs/StatusDotIcon'
import StatusPlayCheckbox from '../svgs/StatusPlayCheckbox'
import StatusPlayIcon from '../svgs/StatusPlayIcon'
import StatusGrowthIcon from '../svgs/StatusGrowthIcon'
import StatusGrowthCheckbox from '../svgs/StatusGrowthCheckbox'
import StatusMonitorIcon from '../svgs/StatusMonitorIcon'
import StatusMonitorCheckbox from '../svgs/StatusMonitorCheckbox'
import StatusCatIcon from '../svgs/StatusCatIcon'
import StatusCatCheckbox from '../svgs/StatusCatCheckbox'
import StatusDollarIcon from '../svgs/StatusDollarIcon'
import StatusDollarCheckbox from '../svgs/StatusDollarCheckbox'
import StatusIphoneIcon from '../svgs/StatusIphoneIcon'
import StatusIphoneCheckbox from '../svgs/StatusIphoneCheckbox'
import StatusMenu from '../svgs/StatusMenu'

export const returnStatusIcons = () => {
  const icons = [
    { name: 'todo', iconSmall: <StatusEmpty />, iconBig: '' },
    {
      name: 'progress',
      iconSmall: <StatusInProgress />,
      iconBig: <Inprogress />,
    },
    { name: 'done', iconSmall: <Status />, iconBig: '' },
    {
      name: 'parameters',
      iconSmall: <StatusParameters />,
      iconBig: <Progress />,
    },
    {
      name: 'maps',
      iconSmall: <StatusMapsIcon />,
      iconBig: <StatusMapsCheckbox />,
    },
    {
      name: 'circle',
      iconSmall: <StatusCircleIcon />,
      iconBig: <StatusCircleCheckbox />,
    },
    {
      name: 'time',
      iconSmall: <StatusTimeIcon />,
      iconBig: <StatusTimeCheckbox />,
    },
    {
      name: 'pause',
      iconSmall: <StatusPauseIcon />,
      iconBig: <StatusPauseCheckbox />,
    },
    {
      name: 'merge',
      iconSmall: <StatusMergeIcon />,
      iconBig: <StatusMergeCheckbox />,
    },
    {
      name: 'test',
      iconSmall: <StatusTestIcon />,
      iconBig: <StatusTestCheckbox />,
    },
    {
      name: 'review',
      iconSmall: <StatusReviewIcon />,
      iconBig: <StatusReviewCheckbox />,
    },
    {
      name: 'translate',
      iconSmall: <StatusTranslateIcon />,
      iconBig: <StatusTranslateCheckbox />,
    },
    {
      name: 'discuss',
      iconSmall: <StatusDiscussIcon />,
      iconBig: <StatusDiscussCheckbox />,
    },
    {
      name: 'rocket',
      iconSmall: <StatusRocketIcon />,
      iconBig: <StatusRocketCheckbox />,
    },
    {
      name: 'phone',
      iconSmall: <StatusPhoneIcon />,
      iconBig: <StatusPhoneCheckbox />,
    },
    {
      name: 'group',
      iconSmall: <StatusGroupIcon />,
      iconBig: <StatusGroupCheckbox />,
    },
    {
      name: 'dot',
      iconSmall: <StatusDotIcon />,
      iconBig: <StatusDotCheckbox />,
    },
    {
      name: 'play',
      iconSmall: <StatusPlayIcon />,
      iconBig: <StatusPlayCheckbox />,
    },
    {
      name: 'growth',
      iconSmall: <StatusGrowthIcon />,
      iconBig: <StatusGrowthCheckbox />,
    },
    {
      name: 'monitor',
      iconSmall: <StatusMonitorIcon />,
      iconBig: <StatusMonitorCheckbox />,
    },
    {
      name: 'cat',
      iconSmall: <StatusCatIcon />,
      iconBig: <StatusCatCheckbox />,
    },
    {
      name: 'dollar',
      iconSmall: <StatusDollarIcon />,
      iconBig: <StatusDollarCheckbox />,
    },
    {
      name: 'iphone',
      iconSmall: <StatusIphoneIcon />,
      iconBig: <StatusIphoneCheckbox />,
    },
  ]

  return icons
}

export const getStatusBigIcon = (icon) => {
  switch (icon) {
    case 'progress':
      return <Inprogress />
    case 'parameters':
      return <Progress />
    case 'maps':
      return <StatusMapsCheckbox />
    case 'circle':
      return <StatusCircleCheckbox />
    case 'time':
      return <StatusTimeCheckbox />
    case 'pause':
      return <StatusPauseCheckbox />
    case 'merge':
      return <StatusMergeCheckbox />
    case 'test':
      return <StatusTestCheckbox />
    case 'review':
      return <StatusReviewCheckbox />
    case 'translate':
      return <StatusTranslateCheckbox />
    case 'discuss':
      return <StatusDiscussCheckbox />
    case 'rocket':
      return <StatusRocketCheckbox />
    case 'phone':
      return <StatusPhoneCheckbox />
    case 'group':
      return <StatusGroupCheckbox />
    case 'dot':
      return <StatusDotCheckbox />
    case 'play':
      return <StatusPlayCheckbox />
    case 'growth':
      return <StatusGrowthCheckbox />
    case 'monitor':
      return <StatusMonitorCheckbox />
    case 'cat':
      return <StatusCatCheckbox />
    case 'dollar':
      return <StatusDollarCheckbox />
    case 'iphone':
      return <StatusIphoneCheckbox />
    default:
      return ''
  }
}

export const getStatusSmallIcon = (icon) => {
  switch (icon) {
    case 'todo':
      return <StatusEmpty />
    case 'progress':
      return <StatusInProgress />
    case 'done':
      return <Status />
    case 'parameters':
      return <StatusParameters />
    case 'maps':
      return <StatusMapsIcon />
    case 'circle':
      return <StatusCircleIcon />
    case 'time':
      return <StatusTimeIcon />
    case 'pause':
      return <StatusPauseIcon />
    case 'merge':
      return <StatusMergeIcon />
    case 'test':
      return <StatusTestIcon />
    case 'review':
      return <StatusReviewIcon />
    case 'translate':
      return <StatusTranslateIcon />
    case 'discuss':
      return <StatusDiscussIcon />
    case 'rocket':
      return <StatusRocketIcon />
    case 'phone':
      return <StatusPhoneIcon />
    case 'group':
      return <StatusGroupIcon />
    case 'dot':
      return <StatusDotIcon />
    case 'play':
      return <StatusPlayIcon />
    case 'growth':
      return <StatusGrowthIcon />
    case 'monitor':
      return <StatusMonitorIcon />
    case 'cat':
      return <StatusCatIcon />
    case 'dollar':
      return <StatusDollarIcon />
    case 'iphone':
      return <StatusIphoneIcon />
    default:
      return <StatusMenu />
  }
}
