import {
  Image,
  Text,
  View,
  ScrollView,
  Pressable,
} from "react-native";
import React, { useLayoutEffect, useEffect, useContext, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SummaryApi from "../common";
import EvilIcons from '@expo/vector-icons/EvilIcons';
import { UserType } from "../context";

const ProfileScreen = () => {
  const { userId } = useContext(UserType);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => null,
      headerStyle: {
        backgroundColor: "#00CED1",
        elevation: 4,            // Android shadow
        shadowColor: "#000",     // iOS shadow
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
      },
      headerLeft: () => (
        <View
          style={{
            paddingLeft: 6,
            justifyContent: "center",
          }}
        >
          <Image
            source={{
              uri: "https://assets.stickpng.com/thumbs/580b57fcd9996e24bc43c518.png",
            }}
            style={{
              marginLeft:10,
              width: 120,
              height: 60,
              resizeMode: "cover",
            }}
          />
        </View>

      ),
      headerRight: () => (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginRight: 12,
            gap: 16,
          }}
        >
          <Pressable
            style={{
              padding: 6,
              borderRadius: 20,
            }}
            android_ripple={{ color: "#ccc" }}
          >
            <Ionicons name="notifications-outline" size={24} color="#1a1a1a" />
          </Pressable>

          <Pressable
            style={{
              padding: 6,
              borderRadius: 20,
            }}
            android_ripple={{ color: "#ccc" }}
          >
            <EvilIcons name="search" size={24} color="#1a1a1a" />
          </Pressable>
        </View>
      ),
    });
  }, [navigation]);


  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(`${SummaryApi.getUser.url}/${userId}`);
  
        setUser(response.data.data);
      } catch (error) {
        console.log("user error", error);
      }
    };
    fetchUserProfile();
  }, []);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          `${SummaryApi.getOrders.url}/${userId}`
        );
        setOrders(response.data.data || []);
      } catch (error) {
        console.log("order error", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const logout = async () => {
    await AsyncStorage.removeItem("authToken");
    navigation.replace("Login");
  };

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: "#F9F9F9",
        padding: 15,
      }}
      showsVerticalScrollIndicator={false}
    >
      {/* USER NAME */}
      <Text
        style={{
          fontSize: 20,
          fontWeight: "700",
          color: "#333",
          marginBottom: 10,
        }}
      >
        Welcome, {user?.name}
      </Text>

      {/* ACTION BUTTONS */}
      <View
        style={{
          flexDirection: "row",
          gap: 12,
          marginTop: 10,
        }}
      >
        <Pressable
          style={{
            flex: 1,
            backgroundColor: "#fff",
            paddingVertical: 14,
            borderRadius: 30,
            elevation: 2,
          }}
        >
          <Text style={{ textAlign: "center", fontWeight: "600" }}>
            Your Orders
          </Text>
        </Pressable>

        <Pressable
          style={{
            flex: 1,
            backgroundColor: "#fff",
            paddingVertical: 14,
            borderRadius: 30,
            elevation: 2,
          }}
        >
          <Text style={{ textAlign: "center", fontWeight: "600" }}>
            Your Account
          </Text>
        </Pressable>
      </View>

      <View
        style={{
          flexDirection: "row",
          gap: 12,
          marginTop: 12,
        }}
      >
        <Pressable
          onPress={()=>navigation.navigate("Home")}
          style={{
            flex: 1,
            backgroundColor: "#fff",
            paddingVertical: 14,
            borderRadius: 30,
            elevation: 2,
          }}
        >
          <Text style={{ textAlign: "center", fontWeight: "600" }}>
            Buy Again
          </Text>
        </Pressable>

        <Pressable
          onPress={logout}
          style={{
            flex: 1,
            backgroundColor: "#FFE5E5",
            paddingVertical: 14,
            borderRadius: 30,
            elevation: 2,
          }}
        >
          <Text
            style={{
              textAlign: "center",
              fontWeight: "600",
              color: "#D32F2F",
            }}
          >
            Logout
          </Text>
        </Pressable>
      </View>

      {/* ORDERS */}
      <Text
        style={{
          fontSize: 16,
          fontWeight: "700",
          marginTop: 25,
          marginBottom: 10,
        }}
      >
        Recent Orders
      </Text>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {loading ? (
          <Text>Loading...</Text>
        ) : orders.length > 0 ? (
          orders.map((order) => (
            <Pressable
              key={order._id}
              style={{
                backgroundColor: "#fff",
                borderRadius: 12,
                padding: 15,
                marginRight: 15,
                width: 170,
                alignItems: "center",
                elevation: 3,
              }}
            >
              {order.product?.slice(0, 1).map((product) => (
                <Image
                  key={product._id}
                  source={{ uri: product.image }}
                  style={{
                    width: 110,
                    height: 110,
                    resizeMode: "contain",
                  }}
                />
              ))}

              <Text
                style={{
                  marginTop: 8,
                  fontSize: 12,
                  color: "#666",
                }}
              >
                Order ID: {order._id.slice(-6)}
              </Text>
            </Pressable>
          ))
        ) : (
          <Text>No orders found</Text>
        )}
      </ScrollView>
    </ScrollView>
  );
};

export default ProfileScreen;
