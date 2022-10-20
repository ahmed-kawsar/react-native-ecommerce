import { StatusBar } from 'expo-status-bar'
import { useEffect, useState } from 'react'
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
} from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign'

export default function App() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchData = async () => {
    const resp = await fetch('https://fakestoreapi.com/products')
    const data = await resp.json()
    setData(data)
    setLoading(false)
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Icon name='arrowleft' size={25} color='#fff' />
        <Text style={styles.headerText}>E-Commerce</Text>
        <Icon name='shoppingcart' size={25} color='#fff' />
      </View>
      <View style={styles.boxContainer}>
        <FlatList
          showsHorizontalScrollIndicator={false}
          numColumns={2}
          data={data}
          renderItem={(item) => (
            <View style={styles.box}>
              <Image
                source={{ uri: item.item.image }}
                style={{ width: '100%', height: 200 }}
              />
              <Text style={styles.itemTitle}>
                {item.item.title.slice(0, 10)}
              </Text>
              <Text style={styles.priceText}>${item.item.price}</Text>
              <Pressable
                onPressIn={() => {
                  console.log('button pressed')
                }}
              >
                <Text style={styles.button}>Buy Now</Text>
              </Pressable>
            </View>
          )}
        />
      </View>
      <StatusBar style='light' />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 15,
    paddingLeft: 8,
    paddingRight: 8,
    backgroundColor: '#d90359',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  boxContainer: {
    backgroundColor: '#bbc3c8',
    padding: 5,
  },
  box: {
    margin: 5,
    padding: 10,
    width: '50%',
    backgroundColor: '#fff',
    borderRadius: 15,
  },
  itemTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingTop: 5,
  },
  priceText: {
    fontSize: 22,
    color: 'darkred',
    paddingBottom: 5,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#d90359',
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
    marginLeft: '10%',
    marginRight: '10%',
    padding: 5,
    borderRadius: 50,
  },
})
