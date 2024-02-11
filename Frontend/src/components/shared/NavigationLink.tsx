
import { Link } from 'react-router-dom'

type Props = {
    to: string;
    bg: string;
    text: string
    textColor: string
    onClink?: () => Promise<void>
}

const NavigationLink = (props: Props) => {
    return (
        <Link onClick={props.onClink} to={props.to} className='nav-link'
            style={{ background: props.bg, color: props.textColor, }}>
            {props.text}
        </Link>
    )
}

export default NavigationLink