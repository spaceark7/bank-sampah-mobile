import { ListItem, useTheme } from '@rneui/themed'
import { Fragment, ReactElement, forwardRef, useState } from 'react'

interface ListCardItemProps {
  title: string
  description: string
  accessoryLeft?: ReactElement
  accessoryRight?: ReactElement
  onPress?: () => void
}

const ListCardItem = forwardRef(
  (
    {
      title,
      description,
      accessoryLeft,
      accessoryRight,
      onPress,
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
          <ListItem.Title>{title}</ListItem.Title>
          <ListItem.Subtitle>{description}</ListItem.Subtitle>
        </ListItem.Content>
        {accessoryRight ? (
          <ListItem.Content right>{accessoryRight}</ListItem.Content>
        ) : null}
      </ListItem>
    )
  }
)

export default ListCardItem
