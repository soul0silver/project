import { useState } from "react";
import SockJS from "sockjs-client";

const ChatRoom = () => {

          var stompClient = null;
          const [publicChat, setPublicChat] = useState([]);
          const [userData, setUserData] = useState({
                    username: "",
                    receiver: "",
                    connected: false,
                    message: ""
          });

          const handleUser = () => {
                    
          }
          const onCennected = () => {
                    
          }

          const setSender = () => {
                    let sock = new SockJS('http://localhost:8080/ws')
                    stompClient = over(sock);
                    stompClient.connect({},onCennected)
          }
          const onConnected = () => {
                    setUserData({ ...userData, "connected": true });
                    stompClient.subscribe("/topic", onPublicMessReceived);
          }
          const onPublicMessReceived = (payload) => {
                    let payloadData = JSON.parse(payload.body);
                    switch (payloadData.MStatus) {
                              case "JOIN": break;
                              case "MESSAGE":
                                        publicChat.push(payloadData);
                                        setPublicChat([...publicChat]);
                                        break;
                    }
          }
          return (
                    <div className="container">
                              <input type="text"
                                        id="username"
                                        placeholder="Enter user name"
                                        value={userData.username}
                                        onChange={handleUser}
                              />

                    </div>
          );
}
export default ChatRoom;