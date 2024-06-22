import EditCitizenshipForm from '@/components/ui/profile/EditCitizenship'
import EditForm from '@/components/ui/profile/EditForm'
import ProfileView from '@/components/ui/profile/profile-view'
import MemberDetailAdmin from '@/components/ui/screens/admin/members/member-detail-admin'
import RegisterMember from '@/components/ui/screens/admin/members/member-register'

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
    case 'member-profile':
      return <ProfileView memberId={props.memberId} {...props} />
    case 'add-member':
      return <RegisterMember {...props} />
    default:
      return null
  }
}

export default RenderScreen
