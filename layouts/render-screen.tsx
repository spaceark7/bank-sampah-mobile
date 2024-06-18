import EditCitizenshipForm from '@/components/ui/profile/EditCitizenship'
import EditForm from '@/components/ui/profile/EditForm'
import AddMember from '@/components/ui/screens/admin/members/add-member'
import MemberDetailAdmin from '@/components/ui/screens/admin/members/member-detail-admin'

const RenderScreen = ({
  segment,
  ...props
}: {
  segment: string
  [key: string]: any
}) => {
  console.log('segment', segment)
  switch (segment) {
    case 'profile':
      return <EditForm />
    case 'citizenship':
      return <EditCitizenshipForm />
    case 'member-detail':
      return <MemberDetailAdmin memberId={props.memberId} {...props} />
    case 'add-member':
      return <AddMember {...props} />
    default:
      return null
  }
}

export default RenderScreen
