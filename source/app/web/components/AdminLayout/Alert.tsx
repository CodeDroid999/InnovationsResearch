import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import cn from 'classnames'
import Link from 'next/link'

type Props = {
  preview?: boolean
}

const Alert = ({ preview }: Props) => {
  return (
    <div className="items-right text-right bg-gray-300">
      <Link
        href="/refer-a-friend"
        className="text-right pt-1 pb-1 pr-4 text-green-950 "
      >
        Earn: Refer a friend
      </Link>
    </div>
  )
}

export default Alert
