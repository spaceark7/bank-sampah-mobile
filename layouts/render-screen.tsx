import EditCitizenshipForm from '@/components/ui/profile/EditCitizenship'
import EditForm from '@/components/ui/profile/EditForm'

const RenderScreen = ({ segment }: { segment: string }) => {
  console.log('segment', segment)
  switch (segment) {
    case 'profile':
      return <EditForm />
    case 'citizenship':
      return <EditCitizenshipForm />
    default:
      return null
  }
}

export default RenderScreen
