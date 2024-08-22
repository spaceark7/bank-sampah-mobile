import { ListItem, useTheme } from '@rneui/themed'
import { Fragment, ReactElement, forwardRef, useState } from 'react'

interface ListCardItemProps {
  title?: string
  description?: string
  accessoryLeft?: ReactElement
  accessoryRight?: ReactElement
  onPress?: () => void
  children?: ReactElement
}

const ListCardItem = forwardRef(
  (
    {
      title,
      description,
      accessoryLeft,
      accessoryRight,
      onPress,
      children,
    }: ListCardItemProps,
    ref
  ) => {
    const [value, setValue] = useState<number>(0)
    const { theme } = useTheme()
    return (
      // <ListItem
      //   title={title}
      //   description={description}
      //   accessoryLeft={() => (accessoryLeft ? accessoryLeft : <Fragment />)}
      //   accessoryRight={() => (
      //     <Fragment>{accessoryRight ? accessoryRight : <Fragment />}</Fragment>
      //   )}
      //   onPress={onPress ? onPress : undefined}
      // />
      <ListItem>
        {accessoryLeft ? accessoryLeft : <Fragment />}
        <ListItem.Content>
          {children ? children : null}
          {title ? <ListItem.Title>{title}</ListItem.Title> : null}
          {description ? (
            <ListItem.Subtitle>{description}</ListItem.Subtitle>
          ) : null}
        </ListItem.Content>
        {accessoryRight ? (
          <ListItem.Content right>{accessoryRight}</ListItem.Content>
        ) : null}
      </ListItem>
    )
  }
)

export const Container = ({ children }: { children: React.ReactNode }) => {
  return <ListItem.Content>{children}</ListItem.Content>
}

export const ListCard = {
  Item: ListCardItem,
  Container,
}

export default ListCardItem
