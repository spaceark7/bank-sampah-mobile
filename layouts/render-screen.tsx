import EditCitizenshipForm from '@/components/ui/profile/EditCitizenship'
import EditForm from '@/components/ui/profile/EditForm'
import EditMemberCitizenship from '@/components/ui/profile/edit-member-citizenship'
import EditMemberForm from '@/components/ui/profile/edit-member-form'
import ProfileView from '@/components/ui/profile/profile-view'
import MaterialForm from '@/components/ui/screens/admin/materials/material-form'
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
    case 'profile-member':
      return <EditMemberForm memberId={props.memberId} />
    case 'citizenship-member':
      return <EditMemberCitizenship memberId={props.memberId} />
    case 'citizenship':
      return <EditCitizenshipForm />
    case 'member-detail':
      return <MemberDetailAdmin memberId={props.memberId} {...props} />
    case 'member-profile':
      return <ProfileView memberId={props.memberId} {...props} />
    case 'add-member':
      return <RegisterMember {...props} />
    case 'add-material':
      return <MaterialForm {...props} />
    default:
      return null
  }
}

export default RenderScreen
