import { useTheme } from '@react-navigation/native'
import { Button, ListItem } from '@ui-kitten/components'
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

    return (
      <ListItem
        title={title}
        description={description}
        accessoryLeft={() => (accessoryLeft ? accessoryLeft : <Fragment />)}
        accessoryRight={() => (
          <Fragment>{accessoryRight ? accessoryRight : <Fragment />}</Fragment>
        )}
        onPress={onPress ? onPress : undefined}
      />
    )
  }
)

export default ListCardItem
