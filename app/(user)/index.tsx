import { SafeAreaView, ScrollView, StyleSheet } from 'react-native'

import BalanceCard from '@/components/ui/dashboard/balance-card'

import TransactionItem from '@/components/ui/transaction/transaction-item'
import { useAppSelector } from '@/store/hooks'
import { Link } from 'expo-router'
import { Text } from '@/components/Themed'

// const Icon = (props: any) => <IconDisplay name='download-outline' {...props} />

const data = new Array(6).fill({
  title: 'Title for Item',
  description: 'Description for Item',
  type: 'Redeem',
  amount: 200000,
})
const data2 = new Array(6).fill({
  title: 'Title for Item',
  description: 'Description for Item',
  type: 'Withdraw',
  amount: 200000,
})

export default function HomeScreen() {
  const loginSuccess = useAppSelector((state) => state.auth.isLogged)

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <ScrollView>
        <Link href={'/(tabs)'}>
          <Text>Home</Text>
        </Link>
        <Link href={'/(admin)'}>
          <Text>Admin</Text>
        </Link>
        {/* <LayoutContainer level='2'>
          <View
            style={{
              minHeight: 150,
            }}
          >
            <BalanceCard />
            <Divider
              style={{
                marginVertical: 20,
              }}
            />
            <View style={styles.container}>
              <Button
                accessoryLeft={Icon}
                style={styles.button}
                onPress={() => {}}
              >
                Penarikan
              </Button>
            </View>
          </View>
        </LayoutContainer>
        <LayoutContainer flex={1}>
          <Text
            style={{
              fontWeight: 'bold',
            }}
          >
            Transaksi
          </Text>
          <View>
            {data.map((item, index) => (
              <TransactionItem
                key={index}
                title={item.title}
                description={item.description}
                type={item.type}
                amount={item.amount}
              />
            ))}
            {data2.map((item, index) => (
              <TransactionItem
                key={index}
                title={item.title}
                description={item.description}
                type={item.type}
                amount={item.amount}
              />
            ))}
          </View>
        </LayoutContainer> */}
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  button: {
    width: '100%',
    borderRadius: 10,
  },
})
