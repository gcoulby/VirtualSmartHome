import "./App.css";
import React, { Component } from "react";
// import Paho from "paho-mqtt/paho-mqtt";
import pahoMqtt from "paho-mqtt/paho-mqtt";
import qr from "./qrcode_gcoulby.github.io.png";
class App extends Component {
  state = {
    subject: "VirtualSmartHome/",
    host: "broker.emqx.io",
    port: "8084",
    // host: "broker.mqttdashboard.com",
    // port: "8000",
    rooms: [
      { Name: "Bedroom", displayStyle: "block" },
      { Name: "Hallway", displayStyle: "block" },
      { Name: "Library", displayStyle: "block" },
      { Name: "Bathroom", displayStyle: "block" },
      { Name: "DiningRoom", displayStyle: "block" },
      { Name: "F1_Stairs", displayStyle: "block" },
      { Name: "LivingRoom", displayStyle: "block" },
      { Name: "Garage", displayStyle: "block" },
      { Name: "GF_Stairs", displayStyle: "block" },
      { Name: "Kitchen", displayStyle: "block" },
      { Name: "Basement", displayStyle: "block" },
    ],
    topic: "",
    client: {},
    messages: [],
  };

  // Called after form input is processed
  startConnect = () => {
    // Generate a random client ID
    let clientID = "clientID-" + parseInt(Math.random() * 100);

    this.pushMessages([
      `Connecting to: ${this.state.host} on port: ${this.state.port}`,
      `Using the following client value: ${clientID}`,
      `-------------------------------------------------------------`,
    ]);

    // console.log(pahoMqtt.C)

    const client = new pahoMqtt.Client(this.state.host, Number(this.state.port), clientID);
    console.log(client);
    // Initialize new Paho client connection

    // Set callback handlers
    client.onConnectionLost = this.onConnectionLost;
    client.onMessageArrived = this.onMessageArrived;

    // Connect the client, if successful, call onConnect function
    client.connect({
      onSuccess: this.onConnect,
      useSSL: true,
    });
    this.setState({ client });
  };

  // Called when the client connects
  onConnect = () => {
    for (let i = 0; i < this.state.rooms.length; i++) {
      let topic = `${this.state.subject}${this.state.rooms[i].Name}/Light`;
      this.state.client.subscribe(topic);

      this.pushMessages([`Subscribing to: ${topic}`]);
    }
  };

  // Called when the client loses its connection
  onConnectionLost(responseObject) {
    console.log("onConnectionLost: Connection Lost");
    if (responseObject.errorCode !== 0) {
      console.log("onConnectionLost: " + responseObject.errorMessage);
    }
  }

  changeLight = (destination, payload) => {
    let room_name = destination.substring(this.state.subject.length, destination.indexOf("/Light"));
    console.log(room_name);
    console.log(this.state);
    console.log(destination);
    const rooms = this.state.rooms.map((r) => {
      if (r.Name === room_name) {
        r.displayStyle = payload === "1" ? "none" : "block";
      }
      return r;
    });
    this.setState({ rooms });
  };

  // Called when a message arrives
  onMessageArrived = (message) => {
    console.log("onMessageArrived: " + message.payloadString);

    this.pushMessages([`Topic: ${message.destinationName} | ${message.payloadString}`]);

    this.changeLight(message.destinationName, message.payloadString);

    this.updateScroll(); // Scroll to bottom of window
  };

  pushMessages = (messageArray) => {
    const messages = [...this.state.messages];
    for (let i = 0; i < messageArray.length; i++) {
      const message = messageArray[i];
      messages.push(message);
    }
    this.setState({ messages });
  };

  // Called when the disconnection button is pressed
  startDisconnect = () => {
    this.state.client.disconnect();
    this.pushMessages(["Disconnected"]);
    this.updateScroll(); // Scroll to bottom of window
  };

  // Updates #messages div to auto-scroll
  updateScroll() {
    var element = document.getElementById("messages");
    element.scrollTop = element.scrollHeight;
  }

  render() {
    return (
      <div className="wrapper">
        <h1>Virtual Smart Home: MQTT Pub/Sub Example</h1>
        <div id="qr">
          <h3>Control This Home from your Smartphone</h3>
          <p>
            <em>
              Scan the QR code and follow the link. Then click connect on the app displayed in your mobile browser.
            </em>
          </p>
          <img src={qr} style={{ width: "100%" }} alt="QR code for virtual smart home controller" />
        </div>

        <svg width="800" height="600" viewBox="0 0 1298.64 1000">
          <defs>
            <clipPath id="clipPath">
              <path
                d="M985.28,293c-30.77,63.44-44.13,249.81-49.14,347.4-1.71,33.28,25.49,61.17,59.64,61.17h0c34.16,0,61.36-27.89,59.65-61.17-5-97.59-18.37-284-49.14-347.4A11.71,11.71,0,0,0,985.28,293Z"
                fill="#b55243"
              />
            </clipPath>
            <clipPath id="clipPath-2">
              <path
                d="M1059.84,388.71C1034.92,440.09,1024.1,591,1020,670.09c-1.38,26.95,20.65,49.54,48.31,49.54h0c27.67,0,49.7-22.59,48.31-49.54-4.06-79.05-14.88-230-39.8-281.38A9.49,9.49,0,0,0,1059.84,388.71Z"
                fill="#ff8d7b"
              />
            </clipPath>
            <clipPath id="clipPath-3">
              <path
                d="M144,314.82c-29.44,60.69-42.21,239-47,332.37C95.32,679,121.34,705.71,154,705.71h0c32.68,0,58.7-26.68,57.07-58.52-4.8-93.37-17.58-271.68-47-332.37A11.21,11.21,0,0,0,144,314.82Z"
                fill="#ffb4a9"
              />
            </clipPath>
            <clipPath id="clipPath-4">
              <path
                d="M229.56,472.08c-19.83,40.88-28.43,161-31.66,223.84-1.1,21.45,16.42,39.42,38.43,39.42h0c22,0,39.53-18,38.43-39.42-3.23-62.87-11.84-183-31.66-223.84A7.55,7.55,0,0,0,229.56,472.08Z"
                fill="#ff8d7b"
              />
            </clipPath>
            <clipPath id="clipPath-5">
              <path
                d="M109.68,801.06a13.21,13.21,0,0,1-10.2-5c-7.1-9.07-20.39-27.88-12.8-32.94,10.1-6.74,32,22.74,32,22.74s-20.21-43-4.21-49.69,27.78,39.58,27.78,39.58-10.1-48.42,8.43-48.63,16.86,48.63,16.86,48.63,6.16-50.11,25-48.63,4.43,50.31,4.43,50.31,16.72-32.84,26.92-32.84,0,37.05,0,37.05,9.5-10.1,24-10.1c10.59,0,0,16.71-6.48,25.7a13.17,13.17,0,0,1-10.89,5.47Z"
                fill="#ff654d"
              />
            </clipPath>
            <clipPath id="clipPath-6">
              <path
                d="M999.1,791.61a13.14,13.14,0,0,1-10.2-5c-7.1-9.07-20.4-27.89-12.81-32.94,10.1-6.74,32,22.73,32,22.73s-20.21-42.94-4.21-49.68,27.79,39.58,27.79,39.58-10.11-48.42,8.42-48.63S1057,766.27,1057,766.27s6.15-50.11,25-48.63,4.42,50.31,4.42,50.31,16.73-32.84,26.92-32.84,0,37,0,37,9.51-10.1,24-10.1c10.59,0,0,16.71-6.49,25.7a13.2,13.2,0,0,1-10.89,5.47Z"
                fill="#ff654d"
              />
            </clipPath>
            <clipPath id="clipPath-7">
              <path
                d="M40.68,789.6H1158.57s-84.84,48.64-579.94,48.64C192.11,838.24,40.68,789.6,40.68,789.6Z"
                fill="#b55243"
              />
            </clipPath>
            <clipPath id="clipPath-8">
              <rect x="888.41" y="477.29" width="6.16" height="46.42" fill="#4b3757" />
            </clipPath>
            <clipPath id="clipPath-9">
              <rect x="877.36" y="477.29" width="6.16" height="46.42" fill="#4b3757" />
            </clipPath>
            <clipPath id="clipPath-10">
              <rect x="866.31" y="477.29" width="6.16" height="46.42" fill="#4b3757" />
            </clipPath>
            <clipPath id="clipPath-11">
              <rect x="855.25" y="477.29" width="6.16" height="46.42" fill="#4b3757" />
            </clipPath>
            <clipPath id="clipPath-12">
              <rect x="844.2" y="477.29" width="6.16" height="46.42" fill="#4b3757" />
            </clipPath>
            <clipPath id="clipPath-13">
              <rect x="833.15" y="477.29" width="6.16" height="46.42" fill="#4b3757" />
            </clipPath>
            <clipPath id="clipPath-14">
              <rect x="256.04" y="375.29" width="256" height="150.32" fill="#ffe8cf" />
            </clipPath>
            <clipPath id="clipPath-15">
              <rect x="310.64" y="413.54" width="144" height="34.18" fill="#b55243" />
            </clipPath>
            <clipPath id="clipPath-16">
              <path d="M304.68,478.39a10.9,10.9,0,1,1-10.9-10.89A10.9,10.9,0,0,1,304.68,478.39Z" fill="#7370bd" />
            </clipPath>
            <clipPath id="clipPath-17">
              <path
                d="M308.94,467.5l-.74-2.05-6.95-22.58H286.2l-6.95,22.58-.73,2.05s4.54,4.42,13.73,4.42c.5,0,1,0,1.48,0s1,0,1.47,0C304.4,471.92,308.94,467.5,308.94,467.5Z"
                fill="#ffe8cf"
              />
            </clipPath>
            <clipPath id="clipPath-18">
              <rect x="273.63" y="488.32" width="40.21" height="10.76" fill="#b55243" />
            </clipPath>
            <clipPath id="clipPath-19">
              <rect x="273.63" y="499.09" width="40.21" height="10.76" fill="#b55243" />
            </clipPath>
            <clipPath id="clipPath-20">
              <rect x="273.63" y="509.85" width="40.21" height="10.76" fill="#b55243" />
            </clipPath>
            <clipPath id="clipPath-21">
              <rect x="272.57" y="487.08" width="42.42" height="2.49" fill="#b55243" />
            </clipPath>
            <clipPath id="clipPath-22">
              <rect x="452.79" y="488.32" width="40.21" height="10.76" fill="#b55243" />
            </clipPath>
            <clipPath id="clipPath-23">
              <rect x="452.79" y="499.09" width="40.21" height="10.76" fill="#b55243" />
            </clipPath>
            <clipPath id="clipPath-24">
              <rect x="452.79" y="509.85" width="40.21" height="10.76" fill="#b55243" />
            </clipPath>
            <clipPath id="clipPath-25">
              <rect x="451.73" y="487.08" width="42.42" height="2.49" fill="#b55243" />
            </clipPath>
            <clipPath id="clipPath-26">
              <rect x="323.31" y="463.68" width="119.37" height="36.32" rx="2.79" fill="#4b3757" />
            </clipPath>
            <clipPath id="clipPath-27">
              <rect x="332.78" y="472.55" width="38.53" height="16.74" rx="2.1" fill="#fff" />
            </clipPath>
            <clipPath id="clipPath-28">
              <rect x="394.67" y="472.55" width="38.53" height="16.74" rx="2.1" fill="#fff" />
            </clipPath>
            <clipPath id="clipPath-29">
              <rect x="317.04" y="481.84" width="132.85" height="22.42" rx="2.4" fill="#fff" />
            </clipPath>
            <clipPath id="clipPath-30">
              <polygon points="438.94 521.5 435.78 521.5 434.52 507.61 440.2 507.61 438.94 521.5" fill="#b55243" />
            </clipPath>
            <clipPath id="clipPath-31">
              <polygon points="330.31 521.5 327.15 521.5 325.89 507.61 331.57 507.61 330.31 521.5" fill="#b55243" />
            </clipPath>
            <clipPath id="clipPath-32">
              <path
                d="M321.31,485.18h124.3a1.48,1.48,0,0,1,1.48,1.48v24.2a0,0,0,0,1,0,0H319.83a0,0,0,0,1,0,0v-24.2A1.48,1.48,0,0,1,321.31,485.18Z"
                fill="#ffea97"
              />
            </clipPath>
            <linearGradient
              id="Degradado_sin_nombre_3"
              x1="385.52"
              y1="461.18"
              x2="385.52"
              y2="370.24"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0" stopColor="#fff" stopOpacity="0" />
              <stop offset="1" stopColor="#fff" />
            </linearGradient>
            <clipPath id="clipPath-33">
              <rect x="463.41" y="461.18" width="18.74" height="24.84" fill="#d3d2ff" />
            </clipPath>
            <clipPath id="clipPath-34">
              <rect x="512.04" y="375.29" width="165.05" height="150.32" fill="#ead16c" />
            </clipPath>
            <clipPath id="clipPath-35">
              <rect x="541.1" y="399.71" width="31.58" height="45.14" fill="#ff8d7b" />
            </clipPath>
            <clipPath id="clipPath-36">
              <rect x="586.51" y="415.82" width="59.31" height="29.03" fill="#7370bd" />
            </clipPath>
            <clipPath id="clipPath-37">
              <rect x="541.1" y="452.87" width="31.58" height="16.96" fill="#ffb4a9" />
            </clipPath>
            <clipPath id="clipPath-38">
              <rect x="586.51" y="452.87" width="31.58" height="16.96" fill="#ff8d7b" />
            </clipPath>
            <clipPath id="clipPath-39">
              <rect x="624.05" y="452.87" width="21.77" height="16.96" fill="#d3d2ff" />
            </clipPath>
            <linearGradient id="Degradado_sin_nombre_3-2" x1="589.89" y1="461.18" x2="589.89" y2="370.24" />
            <clipPath id="clipPath-40">
              <rect x="673.36" y="375.29" width="150.32" height="150.32" fill="#ffe8cf" />
            </clipPath>
            <clipPath id="clipPath-41">
              <rect x="689.62" y="470.66" width="122.53" height="5.05" fill="#b55243" />
            </clipPath>
            <clipPath id="clipPath-42">
              <rect x="697.71" y="475.71" width="106.35" height="15.53" fill="#b55243" />
            </clipPath>
            <clipPath id="clipPath-43">
              <rect x="692.46" y="475.71" width="5.25" height="44.84" fill="#b55243" />
            </clipPath>
            <clipPath id="clipPath-44">
              <rect x="804.06" y="475.71" width="5.25" height="44.84" fill="#b55243" />
            </clipPath>
            <clipPath id="clipPath-45">
              <path d="M701.73,432.76h-8.42V405.39h8.42Z" fill="#b55243" />
            </clipPath>
            <clipPath id="clipPath-46">
              <path d="M802.67,432.76H782.79a4,4,0,0,1-4-4h0a4,4,0,0,1,4-4h19.88Z" fill="#4b3757" />
            </clipPath>
            <clipPath id="clipPath-47">
              <path
                d="M802.67,426.48H783.73a2.28,2.28,0,0,0-2.28,2.27h0a2.28,2.28,0,0,0,2.28,2.28h18.94Z"
                fill="#ffe8cf"
              />
            </clipPath>
            <clipPath id="clipPath-48">
              <path d="M802.67,424.75H782.79a4,4,0,0,1-4-4h0a4,4,0,0,1,4-4h19.88Z" fill="#ffea97" />
            </clipPath>
            <clipPath id="clipPath-49">
              <path
                d="M802.67,418.46H783.73a2.28,2.28,0,0,0-2.28,2.28h0a2.28,2.28,0,0,0,2.28,2.28h18.94Z"
                fill="#ffe8cf"
              />
            </clipPath>
            <clipPath id="clipPath-50">
              <path d="M771.71,432.76h-8.42V405.39h8.42Z" fill="#4b3757" />
            </clipPath>
            <clipPath id="clipPath-51">
              <path d="M780,432.76H771.6V412.14H780Z" fill="#b55243" />
            </clipPath>
            <clipPath id="clipPath-52">
              <path d="M746.64,431.44l-8.2,1.92-6.25-26.64,8.19-1.92Z" fill="#7370bd" />
            </clipPath>
            <clipPath id="clipPath-53">
              <path
                d="M733.73,432.76H707.1a5.36,5.36,0,0,1-5.37-5.37h0A5.36,5.36,0,0,1,707.1,422h26.63Z"
                fill="#4b3757"
              />
            </clipPath>
            <clipPath id="clipPath-54">
              <path d="M733.73,424.34H708.36a3,3,0,0,0-3.05,3.05h0a3.05,3.05,0,0,0,3.05,3.06h25.37Z" fill="#ffe8cf" />
            </clipPath>
            <clipPath id="clipPath-55">
              <path d="M733.73,422H707.1a5.37,5.37,0,0,1-5.37-5.37h0a5.36,5.36,0,0,1,5.37-5.37h26.63Z" fill="#d3d2ff" />
            </clipPath>
            <clipPath id="clipPath-56">
              <path d="M733.73,413.61H708.36a3,3,0,0,0-3.05,3.05h0a3,3,0,0,0,3.05,3h25.37Z" fill="#ffe8cf" />
            </clipPath>
            <clipPath id="clipPath-57">
              <path
                d="M739.09,415h26.15a0,0,0,0,1,0,0v9.58a0,0,0,0,1,0,0H739.09a2.39,2.39,0,0,1-2.39-2.39v-4.79A2.39,2.39,0,0,1,739.09,415Z"
                transform="translate(1170.72 -331.21) rotate(90)"
                fill="#ffea97"
              />
            </clipPath>
            <clipPath id="clipPath-58">
              <path d="M753.69,434V411.39a2.72,2.72,0,0,0-2.72-2.72h0a2.72,2.72,0,0,0-2.73,2.72V434Z" fill="#ffe8cf" />
            </clipPath>
            <clipPath id="clipPath-59">
              <path d="M755.75,434V415.39a3.76,3.76,0,0,1,3.76-3.75h0a3.75,3.75,0,0,1,3.76,3.75V434Z" fill="#7370bd" />
            </clipPath>
            <clipPath id="clipPath-60">
              <path d="M761.65,434V416.28a2.14,2.14,0,0,0-2.14-2.14h0a2.13,2.13,0,0,0-2.13,2.14V434Z" fill="#ffe8cf" />
            </clipPath>
            <clipPath id="clipPath-61">
              <rect x="689.62" y="432.76" width="122.53" height="3.16" fill="#b55243" />
            </clipPath>
            <linearGradient id="Degradado_sin_nombre_3-3" x1="754.41" y1="480.92" x2="754.41" y2="380.34" />
            <clipPath id="clipPath-62">
              <rect x="256.04" y="525.61" width="122.11" height="132" fill="#d3d2ff" />
            </clipPath>
            <clipPath id="clipPath-63">
              <path
                d="M363.31,620H320.36V565.76a21.47,21.47,0,0,1,21.47-21.47h0a21.48,21.48,0,0,1,21.48,21.47Z"
                fill="#d3d2ff"
              />
            </clipPath>
            <clipPath id="clipPath-64">
              <path
                d="M351.75,609.36h-2.7a1,1,0,0,1-1-.77l-.43-1.91a1,1,0,0,1,1-1.19h3.56a1,1,0,0,1,.95,1.19l-.42,1.91A1,1,0,0,1,351.75,609.36Z"
                fill="#7370bd"
              />
            </clipPath>
            <clipPath id="clipPath-65">
              <path
                d="M335.68,609.36H333a1,1,0,0,1-1-.77l-.43-1.91a1,1,0,0,1,1-1.19h3.56a1,1,0,0,1,1,1.19l-.43,1.91A1,1,0,0,1,335.68,609.36Z"
                fill="#7370bd"
              />
            </clipPath>
            <clipPath id="clipPath-66">
              <path
                d="M342.19,613.25h0a1.68,1.68,0,0,1-1.67-1.68V593a1.68,1.68,0,0,1,1.67-1.68h0a1.68,1.68,0,0,1,1.68,1.68v18.61A1.68,1.68,0,0,1,342.19,613.25Z"
                fill="#fff"
              />
            </clipPath>
            <clipPath id="clipPath-67">
              <rect x="310.99" y="611.46" width="30.78" height="44.68" fill="#fff" />
            </clipPath>
            <clipPath id="clipPath-68">
              <rect x="341.77" y="611.46" width="30.78" height="44.68" fill="#fff" />
            </clipPath>
            <clipPath id="clipPath-69">
              <path d="M273.39,639.89v14h24.34v-3.75h-5.26a4.26,4.26,0,0,1-4.26-4.26v-4" fill="#fff" />
            </clipPath>
            <clipPath id="clipPath-70">
              <path
                d="M288.93,611.5H268.19a2.37,2.37,0,0,1-2.38-2.38h0a2.38,2.38,0,0,1,2.38-2.38h20.74a2.39,2.39,0,0,1,2.38,2.38h0A2.38,2.38,0,0,1,288.93,611.5Z"
                fill="#fff"
              />
            </clipPath>
            <clipPath id="clipPath-71">
              <path
                d="M268.43,630.24V611.5h15.33v23.39h15a.87.87,0,0,1,.64,1.47l-1.8,1.94a11.89,11.89,0,0,1-8.74,3.83h-8.53A11.89,11.89,0,0,1,268.43,630.24Z"
                fill="#fff"
              />
            </clipPath>
            <clipPath id="clipPath-72">
              <path
                d="M283.76,634.89h16.58a1.82,1.82,0,0,0,1.81-1.82h0a1.81,1.81,0,0,0-1.81-1.81H283.76Z"
                fill="#fff"
              />
            </clipPath>
            <clipPath id="clipPath-73">
              <rect x="275.04" y="566.42" width="18.71" height="27.16" fill="#fff" />
            </clipPath>
            <clipPath id="clipPath-74">
              <rect x="293.75" y="566.42" width="18.71" height="27.16" fill="#fff" />
            </clipPath>
            <linearGradient id="Degradado_sin_nombre_3-4" x1="319.26" y1="608.96" x2="319.26" y2="518.01" />
            <clipPath id="clipPath-75">
              <rect x="378.15" y="525.61" width="216.8" height="132" fill="#ead16c" />
            </clipPath>
            <clipPath id="clipPath-76">
              <rect
                x="390.04"
                y="652.16"
                width="13.88"
                height="3.88"
                transform="translate(-257.11 1051.08) rotate(-90)"
                fill="#4b3757"
              />
            </clipPath>
            <clipPath id="clipPath-77">
              <rect
                x="382.04"
                y="643.01"
                width="33.76"
                height="4.15"
                transform="translate(797.84 1290.16) rotate(180)"
                fill="#ffe8cf"
              />
            </clipPath>
            <clipPath id="clipPath-78">
              <rect
                x="406.92"
                y="638.27"
                width="13.88"
                height="3.88"
                transform="translate(-226.35 1054.07) rotate(-90)"
                fill="#4b3757"
              />
            </clipPath>
            <clipPath id="clipPath-79">
              <rect
                x="406.99"
                y="638.16"
                width="13.88"
                height="3.88"
                transform="translate(-226.17 1054.03) rotate(-90)"
                fill="#4b3757"
              />
            </clipPath>
            <clipPath id="clipPath-80">
              <rect
                x="398.99"
                y="629.02"
                width="33.76"
                height="4.15"
                transform="translate(831.74 1262.18) rotate(180)"
                fill="#ffe8cf"
              />
            </clipPath>
            <clipPath id="clipPath-81">
              <rect
                x="423.87"
                y="624.28"
                width="13.88"
                height="3.88"
                transform="translate(-195.41 1057.03) rotate(-90)"
                fill="#4b3757"
              />
            </clipPath>
            <clipPath id="clipPath-82">
              <rect
                x="423.94"
                y="624.17"
                width="13.88"
                height="3.88"
                transform="translate(-195.23 1056.99) rotate(-90)"
                fill="#4b3757"
              />
            </clipPath>
            <clipPath id="clipPath-83">
              <rect
                x="415.94"
                y="615.03"
                width="33.76"
                height="4.15"
                transform="translate(865.63 1234.2) rotate(180)"
                fill="#ffe8cf"
              />
            </clipPath>
            <clipPath id="clipPath-84">
              <rect
                x="440.82"
                y="610.29"
                width="13.88"
                height="3.88"
                transform="translate(-164.47 1059.99) rotate(-90)"
                fill="#4b3757"
              />
            </clipPath>
            <clipPath id="clipPath-85">
              <rect
                x="440.89"
                y="610.18"
                width="13.88"
                height="3.88"
                transform="translate(-164.29 1059.95) rotate(-90)"
                fill="#4b3757"
              />
            </clipPath>
            <clipPath id="clipPath-86">
              <rect
                x="432.89"
                y="601.03"
                width="33.76"
                height="4.15"
                transform="translate(899.53 1206.21) rotate(180)"
                fill="#ffe8cf"
              />
            </clipPath>
            <clipPath id="clipPath-87">
              <rect
                x="457.76"
                y="596.3"
                width="13.88"
                height="3.88"
                transform="translate(-133.53 1062.94) rotate(-90)"
                fill="#4b3757"
              />
            </clipPath>
            <clipPath id="clipPath-88">
              <rect
                x="457.83"
                y="596.19"
                width="13.88"
                height="3.88"
                transform="translate(-133.35 1062.9) rotate(-90)"
                fill="#4b3757"
              />
            </clipPath>
            <clipPath id="clipPath-89">
              <rect
                x="449.84"
                y="587.04"
                width="33.76"
                height="4.15"
                transform="translate(933.43 1178.23) rotate(180)"
                fill="#ffe8cf"
              />
            </clipPath>
            <clipPath id="clipPath-90">
              <rect
                x="474.71"
                y="582.31"
                width="13.88"
                height="3.88"
                transform="translate(-102.59 1065.9) rotate(-90)"
                fill="#4b3757"
              />
            </clipPath>
            <clipPath id="clipPath-91">
              <rect
                x="474.78"
                y="582.2"
                width="13.88"
                height="3.88"
                transform="translate(-102.42 1065.86) rotate(-90)"
                fill="#4b3757"
              />
            </clipPath>
            <clipPath id="clipPath-92">
              <rect
                x="466.78"
                y="573.05"
                width="33.76"
                height="4.15"
                transform="translate(967.32 1150.25) rotate(180)"
                fill="#ffe8cf"
              />
            </clipPath>
            <clipPath id="clipPath-93">
              <rect
                x="491.66"
                y="568.32"
                width="13.88"
                height="3.88"
                transform="translate(-71.66 1068.86) rotate(-90)"
                fill="#4b3757"
              />
            </clipPath>
            <clipPath id="clipPath-94">
              <rect
                x="491.73"
                y="568.21"
                width="13.88"
                height="3.88"
                transform="translate(-71.48 1068.82) rotate(-90)"
                fill="#4b3757"
              />
            </clipPath>
            <clipPath id="clipPath-95">
              <rect
                x="483.73"
                y="559.06"
                width="33.76"
                height="4.15"
                transform="translate(1001.22 1122.27) rotate(180)"
                fill="#ffe8cf"
              />
            </clipPath>
            <clipPath id="clipPath-96">
              <rect
                x="508.61"
                y="554.33"
                width="13.88"
                height="3.88"
                transform="translate(-40.72 1071.81) rotate(-90)"
                fill="#4b3757"
              />
            </clipPath>
            <clipPath id="clipPath-97">
              <rect
                x="508.68"
                y="554.22"
                width="13.88"
                height="3.88"
                transform="translate(-40.54 1071.77) rotate(-90)"
                fill="#4b3757"
              />
            </clipPath>
            <clipPath id="clipPath-98">
              <rect
                x="500.68"
                y="545.07"
                width="33.76"
                height="4.15"
                transform="translate(1035.11 1094.28) rotate(180)"
                fill="#ffe8cf"
              />
            </clipPath>
            <clipPath id="clipPath-99">
              <rect
                x="525.56"
                y="540.34"
                width="13.88"
                height="3.88"
                transform="translate(-9.78 1074.77) rotate(-90)"
                fill="#4b3757"
              />
            </clipPath>
            <clipPath id="clipPath-100">
              <rect
                x="525.63"
                y="540.23"
                width="13.88"
                height="3.88"
                transform="translate(-9.6 1074.73) rotate(-90)"
                fill="#4b3757"
              />
            </clipPath>
            <clipPath id="clipPath-101">
              <rect
                x="517.63"
                y="531.08"
                width="33.76"
                height="4.15"
                transform="translate(1069.01 1066.3) rotate(180)"
                fill="#ffe8cf"
              />
            </clipPath>
            <clipPath id="clipPath-102">
              <rect
                x="542.5"
                y="526.34"
                width="13.88"
                height="3.88"
                transform="translate(21.16 1077.73) rotate(-90)"
                fill="#4b3757"
              />
            </clipPath>
            <clipPath id="clipPath-103">
              <circle cx="557.34" cy="583.43" r="29.24" fill="#d3d2ff" />
            </clipPath>
            <clipPath id="clipPath-104">
              <path
                d="M520.16,629.57h-35c-6,27.2,17.53,25.26,17.53,25.26S526.14,656.77,520.16,629.57Z"
                fill="#d3d2ff"
              />
            </clipPath>
            <clipPath id="clipPath-105">
              <path
                d="M520.16,629.57c0-2-7.85-3.58-17.52-3.58s-17.53,1.6-17.53,3.58,7.85,3.58,17.53,3.58S520.16,631.55,520.16,629.57Z"
                fill="#4b3757"
              />
            </clipPath>
            <clipPath id="clipPath-106">
              <path
                d="M518.7,620.54l7.89-22.64-13.48,20.44,4.32-33.17-11.55,30-7.52-38.73V624.2l-11.9-29.6,5.6,30.4-16.61-21.2,11,23.69c0,1.82,7.22,3.29,16.12,3.29s16.12-1.47,16.12-3.29l9.82-12.61Z"
                fill="#b55243"
              />
            </clipPath>
            <linearGradient id="Degradado_sin_nombre_3-5" x1="426.04" y1="608.96" x2="426.04" y2="518.01" />
            <linearGradient id="Degradado_sin_nombre_3-6" x1="549.86" y1="608.96" x2="549.86" y2="518.01" />
            <clipPath id="clipPath-107">
              <rect x="256.04" y="657.92" width="160" height="132" fill="#ff8d7b" />
            </clipPath>
            <clipPath id="clipPath-108">
              <rect x="329.98" y="669.39" width="17.17" height="25.47" rx="2.69" fill="#ffea97" />
            </clipPath>
            <clipPath id="clipPath-109">
              <rect
                x="349.1"
                y="673.82"
                width="17.75"
                height="23.08"
                rx="2.69"
                transform="translate(-327.38 1043.34) rotate(-90)"
                fill="#4b3757"
              />
            </clipPath>
            <clipPath id="clipPath-110">
              <path
                d="M312.31,680.27v-9.81H287.57v9.81h-3.42V694.4L315.06,696V680.27Zm-22.74-7.81h20.74v7.81H289.57Z"
                fill="#ffea97"
              />
            </clipPath>
            <clipPath id="clipPath-111">
              <path
                d="M389.89,683.63v-7.71H370.43v7.71h-2.69v11.12L392.06,696V683.63ZM372,677.49h16.32v6.14H372Z"
                fill="#7370bd"
              />
            </clipPath>
            <clipPath id="clipPath-112">
              <rect x="279.94" y="693.29" width="114.11" height="3.79" fill="#4b3757" />
            </clipPath>
            <clipPath id="clipPath-113">
              <rect x="368.89" y="743.92" width="13.26" height="6.21" rx="1.15" fill="#4b3757" />
            </clipPath>
            <clipPath id="clipPath-114">
              <rect x="294.99" y="743.92" width="13.26" height="6.21" rx="1.15" fill="#4b3757" />
            </clipPath>
            <clipPath id="clipPath-115">
              <path
                d="M292.91,786.55h0a3.47,3.47,0,0,1-3.47-3.47V772.27a3.47,3.47,0,0,1,3.47-3.47h0a3.48,3.48,0,0,1,3.48,3.47v10.81A3.47,3.47,0,0,1,292.91,786.55Z"
                fill="#4b3757"
              />
            </clipPath>
            <clipPath id="clipPath-116">
              <path
                d="M384.23,786.55h0a3.47,3.47,0,0,1-3.48-3.47V772.27a3.48,3.48,0,0,1,3.48-3.47h0a3.47,3.47,0,0,1,3.47,3.47v10.81A3.47,3.47,0,0,1,384.23,786.55Z"
                fill="#4b3757"
              />
            </clipPath>
            <clipPath id="clipPath-117">
              <polygon
                points="383.73 748.6 371.93 748.6 358.07 723.5 338.57 723.5 319.07 723.5 305.21 748.6 293.41 748.6 283.66 773.7 338.57 773.7 393.48 773.7 383.73 748.6"
                fill="#7370bd"
              />
            </clipPath>
            <clipPath id="clipPath-118">
              <rect x="309.1" y="752.24" width="58.95" height="12.84" rx="1.58" fill="#4b3757" />
            </clipPath>
            <clipPath id="clipPath-119">
              <polygon points="308.25 748.6 369.52 748.6 356.68 725.92 320.68 725.92 308.25 748.6" fill="#fff" />
            </clipPath>
            <clipPath id="clipPath-120">
              <path d="M305.48,759.38a5.69,5.69,0,1,0-5.69,5.7A5.69,5.69,0,0,0,305.48,759.38Z" fill="#fff" />
            </clipPath>
            <clipPath id="clipPath-121">
              <circle cx="377.32" cy="759.38" r="5.69" fill="#fff" />
            </clipPath>
            <linearGradient id="Degradado_sin_nombre_3-7" x1="338.57" y1="740.26" x2="338.57" y2="649.32" />
            <clipPath id="clipPath-122">
              <rect x="256.04" y="789.92" width="338.53" height="126" fill="#895da8" />
            </clipPath>
            <clipPath id="clipPath-123">
              <rect
                x="282.85"
                y="917.04"
                width="13.88"
                height="3.89"
                transform="translate(-629.19 1208.77) rotate(-90)"
                fill="#4b3757"
              />
            </clipPath>
            <clipPath id="clipPath-124">
              <rect
                x="274.81"
                y="907.89"
                width="33.85"
                height="4.15"
                transform="translate(583.47 1819.93) rotate(180)"
                fill="#ffe8cf"
              />
            </clipPath>
            <clipPath id="clipPath-125">
              <rect
                x="299.78"
                y="903.15"
                width="13.88"
                height="3.89"
                transform="translate(-598.38 1211.81) rotate(-90)"
                fill="#4b3757"
              />
            </clipPath>
            <clipPath id="clipPath-126">
              <rect
                x="299.85"
                y="903.04"
                width="13.88"
                height="3.89"
                transform="translate(-598.2 1211.77) rotate(-90)"
                fill="#4b3757"
              />
            </clipPath>
            <clipPath id="clipPath-127">
              <rect
                x="291.8"
                y="893.9"
                width="33.85"
                height="4.15"
                transform="translate(617.46 1791.95) rotate(180)"
                fill="#ffe8cf"
              />
            </clipPath>
            <clipPath id="clipPath-128">
              <rect
                x="316.77"
                y="889.16"
                width="13.88"
                height="3.89"
                transform="translate(-567.39 1214.82) rotate(-90)"
                fill="#4b3757"
              />
            </clipPath>
            <clipPath id="clipPath-129">
              <rect
                x="316.84"
                y="889.05"
                width="13.88"
                height="3.89"
                transform="translate(-567.22 1214.78) rotate(-90)"
                fill="#4b3757"
              />
            </clipPath>
            <clipPath id="clipPath-130">
              <rect
                x="308.8"
                y="879.91"
                width="33.85"
                height="4.15"
                transform="translate(651.45 1763.97) rotate(180)"
                fill="#ffe8cf"
              />
            </clipPath>
            <clipPath id="clipPath-131">
              <rect
                x="333.77"
                y="875.17"
                width="13.88"
                height="3.89"
                transform="translate(-536.41 1217.82) rotate(-90)"
                fill="#4b3757"
              />
            </clipPath>
            <clipPath id="clipPath-132">
              <rect
                x="333.84"
                y="875.06"
                width="13.88"
                height="3.89"
                transform="translate(-536.23 1217.78) rotate(-90)"
                fill="#4b3757"
              />
            </clipPath>
            <clipPath id="clipPath-133">
              <rect
                x="325.8"
                y="865.92"
                width="33.85"
                height="4.15"
                transform="translate(685.44 1735.98) rotate(180)"
                fill="#ffe8cf"
              />
            </clipPath>
            <clipPath id="clipPath-134">
              <rect
                x="350.76"
                y="861.18"
                width="13.88"
                height="3.89"
                transform="translate(-505.42 1220.83) rotate(-90)"
                fill="#4b3757"
              />
            </clipPath>
            <clipPath id="clipPath-135">
              <rect
                x="350.83"
                y="861.07"
                width="13.88"
                height="3.89"
                transform="translate(-505.24 1220.79) rotate(-90)"
                fill="#4b3757"
              />
            </clipPath>
            <clipPath id="clipPath-136">
              <rect
                x="342.79"
                y="851.93"
                width="33.85"
                height="4.15"
                transform="translate(719.43 1708) rotate(180)"
                fill="#ffe8cf"
              />
            </clipPath>
            <clipPath id="clipPath-137">
              <rect
                x="367.76"
                y="847.19"
                width="13.88"
                height="3.89"
                transform="translate(-474.43 1223.83) rotate(-90)"
                fill="#4b3757"
              />
            </clipPath>
            <clipPath id="clipPath-138">
              <rect
                x="367.83"
                y="847.08"
                width="13.88"
                height="3.89"
                transform="translate(-474.25 1223.79) rotate(-90)"
                fill="#4b3757"
              />
            </clipPath>
            <clipPath id="clipPath-139">
              <rect
                x="359.79"
                y="837.94"
                width="33.85"
                height="4.15"
                transform="translate(753.43 1680.02) rotate(180)"
                fill="#ffe8cf"
              />
            </clipPath>
            <clipPath id="clipPath-140">
              <rect
                x="384.75"
                y="833.2"
                width="13.88"
                height="3.89"
                transform="translate(-443.45 1226.84) rotate(-90)"
                fill="#4b3757"
              />
            </clipPath>
            <clipPath id="clipPath-141">
              <rect
                x="384.82"
                y="833.09"
                width="13.88"
                height="3.89"
                transform="translate(-443.27 1226.8) rotate(-90)"
                fill="#4b3757"
              />
            </clipPath>
            <clipPath id="clipPath-142">
              <rect
                x="376.78"
                y="823.94"
                width="33.85"
                height="4.15"
                transform="translate(787.42 1652.04) rotate(180)"
                fill="#ffe8cf"
              />
            </clipPath>
            <clipPath id="clipPath-143">
              <rect
                x="401.75"
                y="819.21"
                width="13.88"
                height="3.89"
                transform="translate(-412.46 1229.84) rotate(-90)"
                fill="#4b3757"
              />
            </clipPath>
            <clipPath id="clipPath-144">
              <rect
                x="401.82"
                y="819.1"
                width="13.88"
                height="3.89"
                transform="translate(-412.28 1229.8) rotate(-90)"
                fill="#4b3757"
              />
            </clipPath>
            <clipPath id="clipPath-145">
              <rect
                x="393.78"
                y="809.95"
                width="33.85"
                height="4.15"
                transform="translate(821.41 1624.05) rotate(180)"
                fill="#ffe8cf"
              />
            </clipPath>
            <clipPath id="clipPath-146">
              <rect
                x="418.75"
                y="805.21"
                width="13.88"
                height="3.89"
                transform="translate(-381.47 1232.85) rotate(-90)"
                fill="#4b3757"
              />
            </clipPath>
            <clipPath id="clipPath-147">
              <rect
                x="418.82"
                y="805.11"
                width="13.88"
                height="3.89"
                transform="translate(-381.29 1232.81) rotate(-90)"
                fill="#4b3757"
              />
            </clipPath>
            <clipPath id="clipPath-148">
              <rect
                x="410.77"
                y="795.96"
                width="33.85"
                height="4.15"
                transform="translate(855.4 1596.07) rotate(180)"
                fill="#ffe8cf"
              />
            </clipPath>
            <clipPath id="clipPath-149">
              <rect
                x="435.74"
                y="791.22"
                width="13.88"
                height="3.89"
                transform="translate(-350.49 1235.85) rotate(-90)"
                fill="#4b3757"
              />
            </clipPath>
            <clipPath id="clipPath-150">
              <rect x="291.41" y="787.71" width="4.84" height="33.47" fill="#4b3757" />
            </clipPath>
            <clipPath id="clipPath-151">
              <rect x="274.35" y="815.37" width="39.38" height="54.23" fill="#fff" />
            </clipPath>
            <clipPath id="clipPath-152">
              <rect x="443.7" y="877.08" width="89.96" height="3.71" fill="#4b3757" />
            </clipPath>
            <clipPath id="clipPath-153">
              <rect x="449.64" y="880.79" width="78.08" height="11.4" fill="#4b3757" />
            </clipPath>
            <clipPath id="clipPath-154">
              <rect x="445.78" y="880.79" width="3.85" height="32.92" fill="#4b3757" />
            </clipPath>
            <clipPath id="clipPath-155">
              <rect x="527.71" y="880.79" width="3.85" height="32.92" fill="#4b3757" />
            </clipPath>
            <clipPath id="clipPath-156">
              <path
                d="M580.76,852.17H534.09a2.57,2.57,0,0,1-2.52-3.08l1.79-8.8a2.56,2.56,0,0,1,2.51-2H579a2.57,2.57,0,0,1,2.52,2l1.78,8.8A2.57,2.57,0,0,1,580.76,852.17Z"
                fill="#fff"
              />
            </clipPath>
            <clipPath id="clipPath-157">
              <rect x="531.18" y="846.85" width="52.71" height="66.12" fill="#fff" />
            </clipPath>
            <clipPath id="clipPath-158">
              <circle cx="557.54" cy="879.91" r="17.17" fill="#d3d2ff" />
            </clipPath>
            <clipPath id="clipPath-159">
              <rect x="386.15" y="890.66" width="9.47" height="12.32" rx="0.88" fill="#ff8d7b" />
            </clipPath>
            <clipPath id="clipPath-160">
              <rect
                x="410.39"
                y="890.66"
                width="9.47"
                height="12.32"
                rx="0.88"
                transform="translate(-198.95 122.53) rotate(-13.58)"
                fill="#7370bd"
                opacity="0.2"
                style={{ mixBlendMode: "multiply" }}
              />
            </clipPath>
            <clipPath id="clipPath-161">
              <rect
                x="417.56"
                y="857.82"
                width="9.16"
                height="10.36"
                rx="0.88"
                fill="#7370bd"
                opacity="0.2"
                style={{ mixBlendMode: "multiply" }}
              />
            </clipPath>
            <clipPath id="clipPath-162">
              <rect x="407.33" y="857.82" width="9.16" height="10.36" rx="0.88" fill="#ffea97" />
            </clipPath>
            <clipPath id="clipPath-163">
              <rect
                x="429.44"
                y="857.28"
                width="9.47"
                height="12.32"
                rx="0.88"
                transform="translate(-429.26 1297.62) rotate(-90)"
                fill="#ff8d7b"
              />
            </clipPath>
            <clipPath id="clipPath-164">
              <rect
                x="399.04"
                y="892.08"
                width="9.47"
                height="12.32"
                rx="0.88"
                transform="translate(-494.46 1302.02) rotate(-90)"
                fill="#fff"
              />
            </clipPath>
            <clipPath id="clipPath-165">
              <rect x="383.1" y="902.82" width="59.88" height="1.54" fill="#4b3757" />
            </clipPath>
            <clipPath id="clipPath-166">
              <rect x="383.1" y="885.49" width="59.88" height="1.54" fill="#4b3757" />
            </clipPath>
            <clipPath id="clipPath-167">
              <rect x="383.1" y="868.17" width="59.88" height="1.54" fill="#4b3757" />
            </clipPath>
            <clipPath id="clipPath-168">
              <rect x="383.1" y="852.27" width="59.88" height="1.54" fill="#4b3757" />
            </clipPath>
            <clipPath id="clipPath-169">
              <rect
                x="353.21"
                y="881.52"
                width="60.05"
                height="1.54"
                transform="translate(1265.53 499.06) rotate(90)"
                fill="#4b3757"
              />
            </clipPath>
            <clipPath id="clipPath-170">
              <rect
                x="412.19"
                y="881.52"
                width="60.05"
                height="1.54"
                transform="translate(1324.52 440.08) rotate(90)"
                fill="#4b3757"
              />
            </clipPath>
            <linearGradient id="Degradado_sin_nombre_3-8" x1="329.31" y1="870.04" x2="329.31" y2="779.1" />
            <linearGradient id="Degradado_sin_nombre_3-9" x1="421.1" y1="870.04" x2="421.1" y2="779.1" />
            <linearGradient id="Degradado_sin_nombre_3-10" x1="512.04" y1="870.04" x2="512.04" y2="779.1" />
            <clipPath id="clipPath-171">
              <rect x="416.04" y="657.92" width="178.9" height="132" fill="#ead16c" />
            </clipPath>
            <clipPath id="clipPath-172">
              <rect x="428.02" y="718.8" width="41.82" height="71.87" fill="#fff" />
            </clipPath>
            <clipPath id="clipPath-173">
              <rect x="466.51" y="750.76" width="2.02" height="13.81" fill="#ffea97" />
            </clipPath>
            <clipPath id="clipPath-174">
              <rect
                x="568.01"
                y="787.57"
                width="13.88"
                height="3.88"
                transform="translate(-214.55 1364.46) rotate(-90)"
                fill="#4b3757"
              />
            </clipPath>
            <clipPath id="clipPath-175">
              <rect x="556.14" y="778.42" width="33.76" height="4.15" fill="#ffe8cf" />
            </clipPath>
            <clipPath id="clipPath-176">
              <rect
                x="551.14"
                y="773.69"
                width="13.88"
                height="3.88"
                transform="translate(-217.55 1333.7) rotate(-90)"
                fill="#4b3757"
              />
            </clipPath>
            <clipPath id="clipPath-177">
              <rect
                x="551.07"
                y="773.58"
                width="13.88"
                height="3.88"
                transform="translate(-217.51 1333.52) rotate(-90)"
                fill="#4b3757"
              />
            </clipPath>
            <clipPath id="clipPath-178">
              <rect x="539.19" y="764.43" width="33.76" height="4.15" fill="#ffe8cf" />
            </clipPath>
            <clipPath id="clipPath-179">
              <rect
                x="534.19"
                y="759.69"
                width="13.88"
                height="3.88"
                transform="translate(-220.5 1302.76) rotate(-90)"
                fill="#4b3757"
              />
            </clipPath>
            <clipPath id="clipPath-180">
              <rect
                x="534.12"
                y="759.58"
                width="13.88"
                height="3.88"
                transform="translate(-220.46 1302.58) rotate(-90)"
                fill="#4b3757"
              />
            </clipPath>
            <clipPath id="clipPath-181">
              <rect x="522.24" y="750.44" width="33.76" height="4.15" fill="#ffe8cf" />
            </clipPath>
            <clipPath id="clipPath-182">
              <rect
                x="517.24"
                y="745.7"
                width="13.88"
                height="3.88"
                transform="translate(-223.46 1271.82) rotate(-90)"
                fill="#4b3757"
              />
            </clipPath>
            <clipPath id="clipPath-183">
              <rect
                x="517.17"
                y="745.59"
                width="13.88"
                height="3.88"
                transform="translate(-223.42 1271.64) rotate(-90)"
                fill="#4b3757"
              />
            </clipPath>
            <clipPath id="clipPath-184">
              <rect x="505.29" y="736.45" width="33.76" height="4.15" fill="#ffe8cf" />
            </clipPath>
            <clipPath id="clipPath-185">
              <rect
                x="500.29"
                y="731.71"
                width="13.88"
                height="3.88"
                transform="translate(-226.42 1240.88) rotate(-90)"
                fill="#4b3757"
              />
            </clipPath>
            <clipPath id="clipPath-186">
              <rect
                x="500.22"
                y="731.6"
                width="13.88"
                height="3.88"
                transform="translate(-226.38 1240.7) rotate(-90)"
                fill="#4b3757"
              />
            </clipPath>
            <clipPath id="clipPath-187">
              <rect x="488.35" y="722.45" width="33.76" height="4.15" fill="#ffe8cf" />
            </clipPath>
            <clipPath id="clipPath-188">
              <rect
                x="483.34"
                y="717.72"
                width="13.88"
                height="3.88"
                transform="translate(-229.37 1209.94) rotate(-90)"
                fill="#4b3757"
              />
            </clipPath>
            <clipPath id="clipPath-189">
              <rect
                x="483.27"
                y="717.61"
                width="13.88"
                height="3.88"
                transform="translate(-229.33 1209.77) rotate(-90)"
                fill="#4b3757"
              />
            </clipPath>
            <clipPath id="clipPath-190">
              <rect x="471.4" y="708.46" width="33.76" height="4.15" fill="#ffe8cf" />
            </clipPath>
            <clipPath id="clipPath-191">
              <rect
                x="466.4"
                y="703.73"
                width="13.88"
                height="3.88"
                transform="translate(-232.33 1179.01) rotate(-90)"
                fill="#4b3757"
              />
            </clipPath>
            <clipPath id="clipPath-192">
              <rect
                x="466.33"
                y="703.62"
                width="13.88"
                height="3.88"
                transform="translate(-232.29 1178.83) rotate(-90)"
                fill="#4b3757"
              />
            </clipPath>
            <clipPath id="clipPath-193">
              <rect x="454.45" y="694.47" width="33.76" height="4.15" fill="#ffe8cf" />
            </clipPath>
            <clipPath id="clipPath-194">
              <rect
                x="449.45"
                y="689.74"
                width="13.88"
                height="3.88"
                transform="translate(-235.29 1148.07) rotate(-90)"
                fill="#4b3757"
              />
            </clipPath>
            <clipPath id="clipPath-195">
              <rect
                x="449.38"
                y="689.63"
                width="13.88"
                height="3.88"
                transform="translate(-235.25 1147.89) rotate(-90)"
                fill="#4b3757"
              />
            </clipPath>
            <clipPath id="clipPath-196">
              <rect x="437.5" y="680.48" width="33.76" height="4.15" fill="#ffe8cf" />
            </clipPath>
            <clipPath id="clipPath-197">
              <rect
                x="432.5"
                y="675.75"
                width="13.88"
                height="3.88"
                transform="translate(-238.24 1117.13) rotate(-90)"
                fill="#4b3757"
              />
            </clipPath>
            <clipPath id="clipPath-198">
              <rect
                x="432.43"
                y="675.64"
                width="13.88"
                height="3.88"
                transform="translate(-238.2 1116.95) rotate(-90)"
                fill="#4b3757"
              />
            </clipPath>
            <clipPath id="clipPath-199">
              <rect x="420.56" y="666.49" width="33.76" height="4.15" fill="#ffe8cf" />
            </clipPath>
            <clipPath id="clipPath-200">
              <rect
                x="415.55"
                y="661.76"
                width="13.88"
                height="3.88"
                transform="translate(-241.2 1086.19) rotate(-90)"
                fill="#4b3757"
              />
            </clipPath>
            <linearGradient id="Degradado_sin_nombre_3-11" x1="557.09" y1="740.26" x2="557.09" y2="649.32" />
            <linearGradient id="Degradado_sin_nombre_3-12" x1="470.94" y1="740.26" x2="470.94" y2="649.32" />
            <clipPath id="clipPath-201">
              <rect x="594.57" y="657.92" width="229.11" height="132" fill="#d3d2ff" />
            </clipPath>
            <clipPath id="clipPath-202">
              <rect x="609.1" y="686.79" width="45.51" height="98.39" fill="#7370bd" />
            </clipPath>
            <clipPath id="clipPath-203">
              <rect x="609.1" y="722.15" width="45.51" height="63.03" fill="#7370bd" />
            </clipPath>
            <clipPath id="clipPath-204">
              <rect x="693.56" y="671.62" width="23.29" height="33.81" fill="#fff" />
            </clipPath>
            <clipPath id="clipPath-205">
              <rect x="716.85" y="671.62" width="23.29" height="33.81" fill="#fff" />
            </clipPath>
            <clipPath id="clipPath-206">
              <rect x="740.14" y="671.62" width="23.29" height="33.81" fill="#fff" />
            </clipPath>
            <clipPath id="clipPath-207">
              <rect x="763.43" y="671.62" width="23.29" height="33.81" fill="#fff" />
            </clipPath>
            <clipPath id="clipPath-208">
              <rect x="786.72" y="671.62" width="23.29" height="33.81" fill="#fff" />
            </clipPath>
            <clipPath id="clipPath-209">
              <path
                d="M747.6,730.56h-2.7a1,1,0,0,1-1-.77l-.43-1.91a1,1,0,0,1,1-1.19H748a1,1,0,0,1,1,1.19l-.43,1.91A1,1,0,0,1,747.6,730.56Z"
                fill="#7370bd"
              />
            </clipPath>
            <clipPath id="clipPath-210">
              <path
                d="M731.53,730.56h-2.7a1,1,0,0,1-1-.77l-.43-1.91a1,1,0,0,1,.95-1.19H732a1,1,0,0,1,1,1.19l-.43,1.91A1,1,0,0,1,731.53,730.56Z"
                fill="#7370bd"
              />
            </clipPath>
            <clipPath id="clipPath-211">
              <path
                d="M738,734.45h0a1.68,1.68,0,0,1-1.67-1.68V714.16a1.67,1.67,0,0,1,1.67-1.67h0a1.68,1.68,0,0,1,1.68,1.67v18.61A1.68,1.68,0,0,1,738,734.45Z"
                fill="#fff"
              />
            </clipPath>
            <clipPath id="clipPath-212">
              <rect x="654.61" y="729.7" width="156.7" height="3.36" fill="#4b3757" />
            </clipPath>
            <clipPath id="clipPath-213">
              <rect x="654.61" y="735.99" width="27.77" height="49.2" fill="#fff" />
            </clipPath>
            <clipPath id="clipPath-214">
              <rect x="765.67" y="735.99" width="45.63" height="16.15" fill="#fff" />
            </clipPath>
            <clipPath id="clipPath-215">
              <rect x="765.67" y="752.13" width="45.63" height="16.15" fill="#fff" />
            </clipPath>
            <clipPath id="clipPath-216">
              <rect x="765.67" y="768.28" width="45.63" height="16.15" fill="#fff" />
            </clipPath>
            <clipPath id="clipPath-217">
              <rect x="682.38" y="735.99" width="27.77" height="49.2" fill="#fff" />
            </clipPath>
            <clipPath id="clipPath-218">
              <rect x="710.14" y="735.99" width="27.77" height="49.2" fill="#fff" />
            </clipPath>
            <clipPath id="clipPath-219">
              <rect x="737.91" y="735.99" width="27.77" height="49.2" fill="#fff" />
            </clipPath>
            <linearGradient id="Degradado_sin_nombre_3-13" x1="657.94" y1="740.26" x2="657.94" y2="649.32" />
            <linearGradient id="Degradado_sin_nombre_3-14" x1="765.74" y1="740.26" x2="765.74" y2="649.32" />
            <clipPath id="clipPath-220">
              <rect x="823.68" y="657.92" width="228.73" height="132" fill="#ffe8cf" />
            </clipPath>
            <clipPath id="clipPath-221">
              <rect x="840.43" y="687.68" width="162.49" height="38.57" fill="#d3d2ff" />
            </clipPath>
            <clipPath id="clipPath-222">
              <path d="M854.3,791.76l10.9-33.49h12l-21.38,34.1C855.32,793.17,854,792.64,854.3,791.76Z" fill="#ff654d" />
            </clipPath>
            <clipPath id="clipPath-223">
              <path
                d="M985.68,791.76l-10.9-33.49h-12l21.38,34.1C984.66,793.17,986,792.64,985.68,791.76Z"
                fill="#ff654d"
              />
            </clipPath>
            <clipPath id="clipPath-224">
              <path
                d="M993.67,755.84c0-3.56-33-4-73.71-4s-73.68.46-73.68,4c0,6.45,33,8.88,73.68,8.88S993.67,762.29,993.67,755.84Z"
                fill="#4b3757"
              />
            </clipPath>
            <clipPath id="clipPath-225">
              <ellipse cx="919.99" cy="755.84" rx="73.68" ry="6.45" fill="#ff654d" />
            </clipPath>
            <clipPath id="clipPath-226">
              <path
                d="M1042,767.63h-33.08c-5.65,25.68,16.54,23.85,16.54,23.85S1047.63,793.31,1042,767.63Z"
                fill="#ff8d7b"
              />
            </clipPath>
            <clipPath id="clipPath-227">
              <ellipse cx="1025.45" cy="767.63" rx="16.54" ry="3.38" fill="#4b3757" />
            </clipPath>
            <clipPath id="clipPath-228">
              <path
                d="M1040.62,759.11l7.44-21.37L1035.33,757l4.08-31.32L1028.51,754l-7.1-36.56v45.13l-11.23-27.94,5.29,28.7-15.68-20,10.39,22.37c0,1.71,6.81,3.1,15.22,3.1s15.22-1.39,15.22-3.1l9.26-11.9Z"
                fill="#7370bd"
              />
            </clipPath>
            <linearGradient id="Degradado_sin_nombre_3-15" x1="889.52" y1="740.26" x2="889.52" y2="649.32" />
            <linearGradient id="Degradado_sin_nombre_3-16" x1="995.26" y1="740.26" x2="995.26" y2="649.32" />
            <clipPath id="clipPath-229">
              <rect x="594.57" y="525.61" width="229.11" height="132" fill="#ff8d7b" />
            </clipPath>
            <clipPath id="clipPath-230">
              <rect x="611.3" y="559.41" width="107.39" height="37.85" fill="#7370bd" />
            </clipPath>
            <clipPath id="clipPath-231">
              <path d="M619.91,656.05l2.67-17.9h8.92l-9,18.7A1.38,1.38,0,0,1,619.91,656.05Z" fill="#4b3757" />
            </clipPath>
            <clipPath id="clipPath-232">
              <path d="M717.68,656.05,715,638.15h-8.92l9,18.7A1.38,1.38,0,0,0,717.68,656.05Z" fill="#4b3757" />
            </clipPath>
            <clipPath id="clipPath-233">
              <path
                d="M714.27,610.06c-9.16-17.37-45.48-15.48-45.48-15.48s-36.31-1.89-45.47,15.48c-8.08,15.31,6.31,20.47,6.31,20.47H708S722.34,625.37,714.27,610.06Z"
                fill="#ffea97"
              />
            </clipPath>
            <clipPath id="clipPath-234">
              <rect x="625.79" y="626.87" width="86" height="14.03" fill="#ffea97" />
            </clipPath>
            <clipPath id="clipPath-235">
              <circle cx="711.79" cy="630.53" r="10.37" fill="#ffea97" />
            </clipPath>
            <clipPath id="clipPath-236">
              <circle cx="625.79" cy="630.53" r="10.37" fill="#ffea97" />
            </clipPath>
            <clipPath id="clipPath-237">
              <path d="M744.8,614.78h-5.55v-18h5.55Z" fill="#b55243" />
            </clipPath>
            <clipPath id="clipPath-238">
              <path
                d="M792.82,614.78H779.7a2.65,2.65,0,0,1-2.64-2.65h0a2.64,2.64,0,0,1,2.64-2.64h13.12Z"
                fill="#4b3757"
              />
            </clipPath>
            <clipPath id="clipPath-239">
              <path
                d="M792.82,610.63H780.33a1.51,1.51,0,0,0-1.51,1.5h0a1.52,1.52,0,0,0,1.51,1.51h12.49Z"
                fill="#ffe8cf"
              />
            </clipPath>
            <clipPath id="clipPath-240">
              <path
                d="M792.82,609.49H779.7a2.64,2.64,0,0,1-2.64-2.64h0a2.65,2.65,0,0,1,2.64-2.65h13.12Z"
                fill="#ffea97"
              />
            </clipPath>
            <clipPath id="clipPath-241">
              <path
                d="M792.82,605.34H780.33a1.52,1.52,0,0,0-1.51,1.51h0a1.51,1.51,0,0,0,1.51,1.5h12.49Z"
                fill="#ffe8cf"
              />
            </clipPath>
            <clipPath id="clipPath-242">
              <path d="M798.29,614.78h-5.55v-18h5.55Z" fill="#4b3757" />
            </clipPath>
            <clipPath id="clipPath-243">
              <path d="M809,614.78h-5.55v-18H809Z" fill="#7370bd" />
            </clipPath>
            <clipPath id="clipPath-244">
              <path d="M815.29,614.59l-5.39.35-1.12-17.52,5.39-.34Z" fill="#ffea97" />
            </clipPath>
            <clipPath id="clipPath-245">
              <path d="M803.78,614.78h-5.56V598.55h5.56Z" fill="#b55243" />
            </clipPath>
            <clipPath id="clipPath-246">
              <path
                d="M765.9,614.78H748.34a3.55,3.55,0,0,1-3.54-3.54h0a3.54,3.54,0,0,1,3.54-3.54H765.9Z"
                fill="#4b3757"
              />
            </clipPath>
            <clipPath id="clipPath-247">
              <path d="M765.9,609.22H749.18a2,2,0,0,0-2,2h0a2,2,0,0,0,2,2H765.9Z" fill="#ffe8cf" />
            </clipPath>
            <clipPath id="clipPath-248">
              <path
                d="M765.9,607.7H748.34a3.55,3.55,0,0,1-3.54-3.54h0a3.54,3.54,0,0,1,3.54-3.54H765.9Z"
                fill="#d3d2ff"
              />
            </clipPath>
            <clipPath id="clipPath-249">
              <path d="M765.9,602.14H749.18a2,2,0,0,0-2,2h0a2,2,0,0,0,2,2H765.9Z" fill="#ffe8cf" />
            </clipPath>
            <clipPath id="clipPath-250">
              <path
                d="M766,615.61V599.94a3.17,3.17,0,0,1,3.16-3.16h0a3.16,3.16,0,0,1,3.16,3.16v15.67Z"
                fill="#ffea97"
              />
            </clipPath>
            <clipPath id="clipPath-251">
              <path d="M770.94,615.61V600.69a1.8,1.8,0,0,0-1.8-1.8h0a1.79,1.79,0,0,0-1.79,1.8v14.92Z" fill="#ffe8cf" />
            </clipPath>
            <clipPath id="clipPath-252">
              <path
                d="M772.3,615.61V603.32a2.48,2.48,0,0,1,2.48-2.48h0a2.48,2.48,0,0,1,2.47,2.48v12.29Z"
                fill="#7370bd"
              />
            </clipPath>
            <clipPath id="clipPath-253">
              <path
                d="M776.19,615.61V603.9a1.41,1.41,0,0,0-1.41-1.4h0a1.41,1.41,0,0,0-1.41,1.4v11.71Z"
                fill="#ffe8cf"
              />
            </clipPath>
            <clipPath id="clipPath-254">
              <rect x="736.82" y="614.78" width="80.79" height="2.08" fill="#4b3757" />
            </clipPath>
            <clipPath id="clipPath-255">
              <path d="M744.8,591.41h-5.55v-18h5.55Z" fill="#7370bd" />
            </clipPath>
            <clipPath id="clipPath-256">
              <path
                d="M785.79,585.11h17.44a0,0,0,0,1,0,0v6.3a0,0,0,0,1,0,0H785.79a1.32,1.32,0,0,1-1.32-1.32v-3.65A1.32,1.32,0,0,1,785.79,585.11Z"
                fill="#4b3757"
              />
            </clipPath>
            <clipPath id="clipPath-257">
              <path
                d="M803.24,586.47H788.36a1.79,1.79,0,0,0-1.79,1.79h0a1.79,1.79,0,0,0,1.79,1.79h14.88Z"
                fill="#ffe8cf"
              />
            </clipPath>
            <clipPath id="clipPath-258">
              <path
                d="M785.79,578.82h17.44a0,0,0,0,1,0,0v6.3a0,0,0,0,1,0,0H785.79a1.32,1.32,0,0,1-1.32-1.32v-3.65A1.32,1.32,0,0,1,785.79,578.82Z"
                fill="#ffea97"
              />
            </clipPath>
            <clipPath id="clipPath-259">
              <path
                d="M803.24,580.17H788.36a1.79,1.79,0,0,0-1.79,1.79h0a1.79,1.79,0,0,0,1.79,1.79h14.88Z"
                fill="#ffe8cf"
              />
            </clipPath>
            <clipPath id="clipPath-260">
              <path d="M761.34,591.41h-5.55v-18h5.55Z" fill="#4b3757" />
            </clipPath>
            <clipPath id="clipPath-261">
              <path d="M808.71,591.41h-5.55v-18h5.55Z" fill="#4b3757" />
            </clipPath>
            <clipPath id="clipPath-262">
              <path d="M816.19,590.89l-5.48.83L808,573.88l5.49-.83Z" fill="#7370bd" />
            </clipPath>
            <clipPath id="clipPath-263">
              <path d="M784.64,585.82v5.56h-18v-5.56Z" fill="#4b3757" />
            </clipPath>
            <clipPath id="clipPath-264">
              <path d="M784.64,580.27v5.55h-18v-5.55Z" fill="#7370bd" />
            </clipPath>
            <clipPath id="clipPath-265">
              <path d="M784.64,574.72v5.55h-18v-5.55Z" fill="#b55243" />
            </clipPath>
            <clipPath id="clipPath-266">
              <path d="M766.83,591.41h-5.55V575.18h5.55Z" fill="#7370bd" />
            </clipPath>
            <clipPath id="clipPath-267">
              <path
                d="M744.51,592.24V576.57a3.15,3.15,0,0,1,3.16-3.15h0a3.16,3.16,0,0,1,3.16,3.15v15.67Z"
                fill="#ffea97"
              />
            </clipPath>
            <clipPath id="clipPath-268">
              <path d="M749.46,592.24V577.32a1.8,1.8,0,0,0-1.79-1.8h0a1.81,1.81,0,0,0-1.8,1.8v14.92Z" fill="#ffe8cf" />
            </clipPath>
            <clipPath id="clipPath-269">
              <path
                d="M750.83,592.24V580a2.47,2.47,0,0,1,2.47-2.47h0a2.48,2.48,0,0,1,2.48,2.47v12.29Z"
                fill="#7370bd"
              />
            </clipPath>
            <clipPath id="clipPath-270">
              <path
                d="M754.71,592.24v-11.7a1.41,1.41,0,0,0-1.41-1.41h0a1.41,1.41,0,0,0-1.41,1.41v11.7Z"
                fill="#ffe8cf"
              />
            </clipPath>
            <clipPath id="clipPath-271">
              <rect x="736.82" y="591.41" width="80.79" height="2.08" fill="#4b3757" />
            </clipPath>
            <clipPath id="clipPath-272">
              <path d="M744.8,568h-5.55V550h5.55Z" fill="#b55243" />
            </clipPath>
            <clipPath id="clipPath-273">
              <path d="M749.35,568h-4.57V553.17h4.57Z" fill="#7370bd" />
            </clipPath>
            <clipPath id="clipPath-274">
              <path d="M753.91,568h-4.58V553.17h4.58Z" fill="#4b3757" />
            </clipPath>
            <clipPath id="clipPath-275">
              <path d="M758.46,568h-4.57V551.82h4.57Z" fill="#7370bd" />
            </clipPath>
            <clipPath id="clipPath-276">
              <path d="M766.69,567.22l-4.43,1.16L758.5,554l4.43-1.16Z" fill="#b55243" />
            </clipPath>
            <clipPath id="clipPath-277">
              <path d="M814.59,568H809V550h5.55Z" fill="#d3d2ff" />
            </clipPath>
            <clipPath id="clipPath-278">
              <path
                d="M803.24,568H790.13a2.65,2.65,0,0,1-2.65-2.64h0a2.65,2.65,0,0,1,2.65-2.65h13.11Z"
                fill="#4b3757"
              />
            </clipPath>
            <clipPath id="clipPath-279">
              <path
                d="M803.24,563.89H790.75a1.52,1.52,0,0,0-1.51,1.51h0a1.51,1.51,0,0,0,1.51,1.5h12.49Z"
                fill="#ffe8cf"
              />
            </clipPath>
            <clipPath id="clipPath-280">
              <path
                d="M803.24,562.75H790.13a2.65,2.65,0,0,1-2.65-2.64h0a2.65,2.65,0,0,1,2.65-2.64h13.11Z"
                fill="#ffea97"
              />
            </clipPath>
            <clipPath id="clipPath-281">
              <path
                d="M803.24,558.61H790.75a1.51,1.51,0,0,0-1.51,1.5h0a1.51,1.51,0,0,0,1.51,1.5h12.49Z"
                fill="#ffe8cf"
              />
            </clipPath>
            <clipPath id="clipPath-282">
              <path d="M782.82,568h-5.55V550h5.55Z" fill="#4b3757" />
            </clipPath>
            <clipPath id="clipPath-283">
              <path d="M788.3,568h-5.55V551.82h5.55Z" fill="#b55243" />
            </clipPath>
            <clipPath id="clipPath-284">
              <path d="M809.89,567.49l-5.49.87-2.83-17.82,5.49-.87Z" fill="#7370bd" />
            </clipPath>
            <clipPath id="clipPath-285">
              <path
                d="M766,568.87V553.21a3.16,3.16,0,0,1,3.16-3.16h0a3.15,3.15,0,0,1,3.16,3.16v15.66Z"
                fill="#ffea97"
              />
            </clipPath>
            <clipPath id="clipPath-286">
              <path d="M770.94,568.87V554a1.81,1.81,0,0,0-1.8-1.8h0a1.8,1.8,0,0,0-1.79,1.8v14.92Z" fill="#ffe8cf" />
            </clipPath>
            <clipPath id="clipPath-287">
              <path
                d="M772.3,568.87V556.58a2.48,2.48,0,0,1,2.48-2.47h0a2.48,2.48,0,0,1,2.47,2.47v12.29Z"
                fill="#7370bd"
              />
            </clipPath>
            <clipPath id="clipPath-288">
              <path
                d="M776.19,568.87v-11.7a1.41,1.41,0,0,0-1.41-1.41h0a1.41,1.41,0,0,0-1.41,1.41v11.7Z"
                fill="#ffe8cf"
              />
            </clipPath>
            <clipPath id="clipPath-289">
              <rect x="736.82" y="568.04" width="80.79" height="2.08" fill="#4b3757" />
            </clipPath>
            <clipPath id="clipPath-290">
              <rect x="736.82" y="546.59" width="80.79" height="2.08" fill="#4b3757" />
            </clipPath>
            <clipPath id="clipPath-291">
              <rect
                x="696.5"
                y="586.05"
                width="81.02"
                height="2.08"
                transform="translate(1324.1 -149.91) rotate(90)"
                fill="#4b3757"
              />
            </clipPath>
            <clipPath id="clipPath-292">
              <rect
                x="776.08"
                y="586.05"
                width="81.02"
                height="2.08"
                transform="translate(1403.68 -229.49) rotate(90)"
                fill="#4b3757"
              />
            </clipPath>
            <clipPath id="clipPath-293">
              <rect x="734.26" y="624.91" width="84.79" height="2.8" fill="#4b3757" />
            </clipPath>
            <clipPath id="clipPath-294">
              <rect x="738.74" y="627.71" width="75.82" height="8.6" fill="#4b3757" />
            </clipPath>
            <clipPath id="clipPath-295">
              <rect x="735.84" y="627.71" width="2.91" height="24.84" fill="#4b3757" />
            </clipPath>
            <clipPath id="clipPath-296">
              <rect x="814.57" y="627.71" width="2.91" height="24.84" fill="#4b3757" />
            </clipPath>
            <linearGradient id="Degradado_sin_nombre_3-17" x1="669.1" y1="620.88" x2="669.1" y2="516.52" />
            <clipPath id="clipPath-297">
              <polygon
                points="1057.81 543.29 828.73 543.29 828.73 652.55 1077.7 652.55 1057.81 543.29"
                fill="#7370bd"
              />
            </clipPath>
            <clipPath id="clipPath-298">
              <polygon points="819.15 189.74 260.56 189.74 214.86 370.24 864.86 370.24 819.15 189.74" fill="#7370bd" />
            </clipPath>
          </defs>
          <title>IoTHouse</title>
          <g style={{ isolation: "isolate" }}>
            <g id="BACKGROUND">
              <path
                d="M67.06,796.45H1126.28s34.6-353.36-210.87-360.74-288-296.55-439.58-335.12S217.72,176.36,217.72,421.71,67.06,452.13,67.06,796.45"
                fill="#fff"
                opacity="0.4"
              />
              <rect width="1200" height="1000" fill="#1f3158" />
            </g>
            <g id="OBJECTS">
              <path
                d="M52.25,244H704s-7.15-42.38-50.94-50-47.58-94.74-121.48-92.84-60.63,34.1-111.79,34.1-44-39.85-100.63-34.14-55.61,62.56-88.33,62.56-22.58-23.74-72.18-10-44,47.87-55.32,49.76S52.25,203,52.25,244Z"
                fill="#57616d"
              />
              <path
                d="M1145.44,498.64h-489s5.37-31.8,38.22-37.48,35.69-71.08,91.13-69.66,45.49,25.59,83.87,25.59,33-29.9,75.5-25.61,41.72,46.93,66.27,46.93,16.94-17.81,54.15-7.48,33,35.91,41.5,37.34S1145.44,467.89,1145.44,498.64Z"
                fill="#57616d"
              />
              <ellipse
                cx="979.2"
                cy="172.29"
                rx="155.39"
                ry="136.91"
                transform="matrix(0.83, -0.55, 0.55, 0.83, 67.3, 568.46)"
                fill="#fff"
                opacity="0.1"
              />
              <ellipse
                cx="979.2"
                cy="172.29"
                rx="125.06"
                ry="110.18"
                transform="translate(423.55 996.77) rotate(-66)"
                fill="#fff"
                opacity="0.2"
              />
              <ellipse
                cx="979.2"
                cy="172.29"
                rx="134.86"
                ry="90.37"
                transform="translate(-7.1 297.7) rotate(-17.23)"
                fill="#fff"
                opacity="0.2"
              />
              <circle
                cx="979.2"
                cy="172.29"
                r="78.26"
                transform="translate(-13.39 229.58) rotate(-13.28)"
                fill="#fff"
              />
              <path
                d="M985.28,293c-30.77,63.44-44.13,249.81-49.14,347.4-1.71,33.28,25.49,61.17,59.64,61.17h0c34.16,0,61.36-27.89,59.65-61.17-5-97.59-18.37-284-49.14-347.4A11.71,11.71,0,0,0,985.28,293Z"
                fill="#b55243"
              />
              <g clipPath="url(#clipPath)">
                <path
                  d="M982.74,280s27.44-16.16,39.13,196.15S929.31,595.3,929.31,595.3V720.76h133.76V280Z"
                  fill="#b55243"
                  opacity="0.2"
                  style={{ mixBlendMode: "multiply" }}
                />
                <path
                  d="M960.45,300.76s30.47-.2,40.86,74.53,28.57,242.23-72,205.12S960.45,300.76,960.45,300.76Z"
                  fill="#fff"
                  opacity="0.2"
                  style={{ mixBlendMode: "overlay" }}
                />
              </g>
              <line
                x1="995.78"
                y1="328.19"
                x2="995.78"
                y2="796.45"
                fill="none"
                stroke="#4b3757"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="3"
              />
              <line
                x1="969.7"
                y1="485.74"
                x2="995.78"
                y2="513.07"
                fill="none"
                stroke="#4b3757"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="3"
              />
              <line
                x1="960.45"
                y1="426.34"
                x2="995.78"
                y2="463.36"
                fill="none"
                stroke="#4b3757"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="3"
              />
              <line
                x1="960.45"
                y1="457.63"
                x2="995.78"
                y2="494.65"
                fill="none"
                stroke="#4b3757"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="3"
              />
              <line
                x1="978.59"
                y1="540.9"
                x2="995.78"
                y2="558.91"
                fill="none"
                stroke="#4b3757"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="3"
              />
              <line
                x1="982.74"
                y1="591.09"
                x2="995.78"
                y2="604.75"
                fill="none"
                stroke="#4b3757"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="3"
              />
              <line
                x1="982.74"
                y1="351.07"
                x2="995.78"
                y2="364.74"
                fill="none"
                stroke="#4b3757"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="3"
              />
              <line
                x1="969.7"
                y1="623.27"
                x2="995.78"
                y2="650.6"
                fill="none"
                stroke="#4b3757"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="3"
              />
              <line
                x1="969.7"
                y1="408.04"
                x2="995.78"
                y2="435.37"
                fill="none"
                stroke="#4b3757"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="3"
              />
              <line
                x1="1021.87"
                y1="516.99"
                x2="995.78"
                y2="544.32"
                fill="none"
                stroke="#4b3757"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="3"
              />
              <line
                x1="1031.12"
                y1="533.5"
                x2="995.78"
                y2="570.52"
                fill="none"
                stroke="#4b3757"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="3"
              />
              <line
                x1="1021.87"
                y1="595.3"
                x2="995.78"
                y2="622.63"
                fill="none"
                stroke="#4b3757"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="3"
              />
              <line
                x1="1021.87"
                y1="380.07"
                x2="995.78"
                y2="407.4"
                fill="none"
                stroke="#4b3757"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="3"
              />
              <line
                x1="1040.75"
                y1="631.84"
                x2="995.78"
                y2="678.95"
                fill="none"
                stroke="#4b3757"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="3"
              />
              <path
                d="M1059.84,388.71C1034.92,440.09,1024.1,591,1020,670.09c-1.38,26.95,20.65,49.54,48.31,49.54h0c27.67,0,49.7-22.59,48.31-49.54-4.06-79.05-14.88-230-39.8-281.38A9.49,9.49,0,0,0,1059.84,388.71Z"
                fill="#ff8d7b"
              />
              <g clipPath="url(#clipPath-2)">
                <path
                  d="M1057.79,383.42s18.81,29.1,31.69,190.49-100.22,41.91-100.22,41.91V741.61H1128V375.29S1058.09,372.86,1057.79,383.42Z"
                  fill="#b55243"
                  opacity="0.2"
                  style={{ mixBlendMode: "multiply" }}
                />
                <path
                  d="M1049.47,389.61s29.08,140.71,28.21,180.07-5.35,93.07-68.14,53.22S1049.47,389.61,1049.47,389.61Z"
                  fill="#fff"
                  opacity="0.2"
                  style={{ mixBlendMode: "overlay" }}
                />
              </g>
              <line
                x1="1068.35"
                y1="417.18"
                x2="1068.35"
                y2="796.45"
                fill="none"
                stroke="#4b3757"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
              <line
                x1="1039.73"
                y1="668.99"
                x2="1068.35"
                y2="698.97"
                fill="none"
                stroke="#4b3757"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
              <line
                x1="1039.73"
                y1="558.91"
                x2="1068.35"
                y2="588.9"
                fill="none"
                stroke="#4b3757"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
              <line
                x1="1054.42"
                y1="589.47"
                x2="1068.35"
                y2="604.06"
                fill="none"
                stroke="#4b3757"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
              <line
                x1="1057.79"
                y1="630.12"
                x2="1068.35"
                y2="641.18"
                fill="none"
                stroke="#4b3757"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
              <line
                x1="1057.79"
                y1="439.32"
                x2="1068.35"
                y2="450.38"
                fill="none"
                stroke="#4b3757"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
              <line
                x1="1047.22"
                y1="646.85"
                x2="1068.35"
                y2="668.99"
                fill="none"
                stroke="#4b3757"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
              <line
                x1="1047.22"
                y1="481.86"
                x2="1068.35"
                y2="503.99"
                fill="none"
                stroke="#4b3757"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
              <line
                x1="1089.48"
                y1="604.75"
                x2="1068.35"
                y2="626.89"
                fill="none"
                stroke="#4b3757"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
              <line
                x1="1089.48"
                y1="510.95"
                x2="1068.35"
                y2="533.09"
                fill="none"
                stroke="#4b3757"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
              <line
                x1="1096.97"
                y1="626.19"
                x2="1068.35"
                y2="656.18"
                fill="none"
                stroke="#4b3757"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
              <line
                x1="1096.97"
                y1="522.02"
                x2="1068.35"
                y2="552.01"
                fill="none"
                stroke="#4b3757"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
              <line
                x1="1096.97"
                y1="678.23"
                x2="1068.35"
                y2="708.21"
                fill="none"
                stroke="#4b3757"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
              <line
                x1="1089.48"
                y1="667.16"
                x2="1068.35"
                y2="689.29"
                fill="none"
                stroke="#4b3757"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
              <line
                x1="1089.48"
                y1="459.2"
                x2="1068.35"
                y2="481.34"
                fill="none"
                stroke="#4b3757"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
              <path
                d="M144,314.82c-29.44,60.69-42.21,239-47,332.37C95.32,679,121.34,705.71,154,705.71h0c32.68,0,58.7-26.68,57.07-58.52-4.8-93.37-17.58-271.68-47-332.37A11.21,11.21,0,0,0,144,314.82Z"
                fill="#ffb4a9"
              />
              <g clipPath="url(#clipPath-3)">
                <path
                  d="M154,295.71s-43.3,228.57-25,282.29,88.66,31,88.66,31V735.34H96.89L67.06,617.07,111,293.18Z"
                  fill="#b55243"
                  opacity="0.2"
                  style={{ mixBlendMode: "multiply" }}
                />
                <path
                  d="M160.89,303S89.3,619.21,217.72,597L207.35,358Z"
                  fill="#fff"
                  opacity="0.2"
                  style={{ mixBlendMode: "overlay" }}
                />
              </g>
              <line
                x1="154.02"
                y1="348.45"
                x2="154.02"
                y2="796.45"
                fill="none"
                stroke="#4b3757"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="3"
              />
              <line
                x1="129.06"
                y1="499.18"
                x2="154.02"
                y2="525.33"
                fill="none"
                stroke="#4b3757"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="3"
              />
              <line
                x1="120.22"
                y1="554.33"
                x2="154.02"
                y2="589.75"
                fill="none"
                stroke="#4b3757"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="3"
              />
              <line
                x1="120.22"
                y1="472.29"
                x2="154.02"
                y2="507.71"
                fill="none"
                stroke="#4b3757"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="3"
              />
              <line
                x1="137.57"
                y1="551.96"
                x2="154.02"
                y2="569.19"
                fill="none"
                stroke="#4b3757"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="3"
              />
              <line
                x1="141.54"
                y1="599.97"
                x2="154.02"
                y2="613.05"
                fill="none"
                stroke="#4b3757"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="3"
              />
              <line
                x1="141.54"
                y1="370.34"
                x2="154.02"
                y2="383.42"
                fill="none"
                stroke="#4b3757"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="3"
              />
              <line
                x1="129.06"
                y1="630.76"
                x2="154.02"
                y2="656.91"
                fill="none"
                stroke="#4b3757"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="3"
              />
              <line
                x1="129.06"
                y1="424.85"
                x2="154.02"
                y2="451"
                fill="none"
                stroke="#4b3757"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="3"
              />
              <line
                x1="111"
                y1="634.27"
                x2="154.02"
                y2="679.34"
                fill="none"
                stroke="#4b3757"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="3"
              />
              <line
                x1="178.98"
                y1="472.42"
                x2="154.02"
                y2="498.57"
                fill="none"
                stroke="#4b3757"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="3"
              />
              <line
                x1="187.83"
                y1="527.57"
                x2="154.02"
                y2="562.99"
                fill="none"
                stroke="#4b3757"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="3"
              />
              <line
                x1="187.83"
                y1="445.53"
                x2="154.02"
                y2="480.95"
                fill="none"
                stroke="#4b3757"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="3"
              />
              <line
                x1="178.98"
                y1="604"
                x2="154.02"
                y2="630.15"
                fill="none"
                stroke="#4b3757"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="3"
              />
              <line
                x1="178.98"
                y1="398.09"
                x2="154.02"
                y2="424.24"
                fill="none"
                stroke="#4b3757"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="3"
              />
              <line
                x1="197.05"
                y1="607.51"
                x2="154.02"
                y2="652.58"
                fill="none"
                stroke="#4b3757"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="3"
              />
              <path
                d="M229.56,472.08c-19.83,40.88-28.43,161-31.66,223.84-1.1,21.45,16.42,39.42,38.43,39.42h0c22,0,39.53-18,38.43-39.42-3.23-62.87-11.84-183-31.66-223.84A7.55,7.55,0,0,0,229.56,472.08Z"
                fill="#ff8d7b"
              />
              <g clipPath="url(#clipPath-4)">
                <path
                  d="M240.53,467.88s-16.5,39.27-22.81,154,47.58,95.73,47.58,95.73,3.59,29.71-45.78,28.55S197.4,520.76,207.35,485.5,240.53,467.88,240.53,467.88Z"
                  fill="#b55243"
                  opacity="0.2"
                  style={{ mixBlendMode: "multiply" }}
                />
              </g>
              <line
                x1="236.33"
                y1="494.73"
                x2="236.33"
                y2="796.45"
                fill="none"
                stroke="#4b3757"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
              <line
                x1="219.52"
                y1="630.42"
                x2="236.33"
                y2="648.03"
                fill="none"
                stroke="#4b3757"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
              <line
                x1="217.72"
                y1="679.34"
                x2="236.33"
                y2="698.83"
                fill="none"
                stroke="#4b3757"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
              <line
                x1="217.72"
                y1="550.37"
                x2="236.33"
                y2="569.86"
                fill="none"
                stroke="#4b3757"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
              <line
                x1="227.92"
                y1="722.64"
                x2="236.33"
                y2="731.45"
                fill="none"
                stroke="#4b3757"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
              <line
                x1="227.92"
                y1="658.26"
                x2="236.33"
                y2="667.06"
                fill="none"
                stroke="#4b3757"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
              <line
                x1="244.73"
                y1="612.67"
                x2="236.33"
                y2="621.47"
                fill="none"
                stroke="#4b3757"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
              <line
                x1="227.92"
                y1="512.26"
                x2="236.33"
                y2="521.06"
                fill="none"
                stroke="#4b3757"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
              <line
                x1="219.52"
                y1="604.24"
                x2="236.33"
                y2="621.85"
                fill="none"
                stroke="#4b3757"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
              <line
                x1="207.35"
                y1="687.22"
                x2="236.33"
                y2="717.58"
                fill="none"
                stroke="#4b3757"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
              <line
                x1="217.72"
                y1="587.29"
                x2="236.33"
                y2="606.78"
                fill="none"
                stroke="#4b3757"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
              <line
                x1="253.14"
                y1="689.35"
                x2="236.33"
                y2="706.96"
                fill="none"
                stroke="#4b3757"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
              <line
                x1="253.14"
                y1="569.19"
                x2="236.33"
                y2="586.8"
                fill="none"
                stroke="#4b3757"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
              <line
                x1="253.14"
                y1="617.07"
                x2="236.33"
                y2="634.68"
                fill="none"
                stroke="#4b3757"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
              <line
                x1="253.14"
                y1="530.66"
                x2="236.33"
                y2="548.27"
                fill="none"
                stroke="#4b3757"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
              <line
                x1="253.14"
                y1="662.66"
                x2="236.33"
                y2="680.27"
                fill="none"
                stroke="#4b3757"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
              <line
                x1="265.3"
                y1="691.71"
                x2="236.33"
                y2="722.07"
                fill="none"
                stroke="#4b3757"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
              <path
                d="M109.68,801.06a13.21,13.21,0,0,1-10.2-5c-7.1-9.07-20.39-27.88-12.8-32.94,10.1-6.74,32,22.74,32,22.74s-20.21-43-4.21-49.69,27.78,39.58,27.78,39.58-10.1-48.42,8.43-48.63,16.86,48.63,16.86,48.63,6.16-50.11,25-48.63,4.43,50.31,4.43,50.31,16.72-32.84,26.92-32.84,0,37.05,0,37.05,9.5-10.1,24-10.1c10.59,0,0,16.71-6.48,25.7a13.17,13.17,0,0,1-10.89,5.47Z"
                fill="#ff654d"
              />
              <g clipPath="url(#clipPath-5)">
                <path
                  d="M166.5,731.45s-19.09-10.9-18.67,11,6.13,40.84,20.54,42.1,83.73,3,83.73,3l-7.29,7.29H92.09L73.31,760.55v-33.5S150.22,711.19,166.5,731.45Z"
                  fill="#b55243"
                  opacity="0.2"
                  style={{ mixBlendMode: "multiply" }}
                />
              </g>
              <path
                d="M999.1,791.61a13.14,13.14,0,0,1-10.2-5c-7.1-9.07-20.4-27.89-12.81-32.94,10.1-6.74,32,22.73,32,22.73s-20.21-42.94-4.21-49.68,27.79,39.58,27.79,39.58-10.11-48.42,8.42-48.63S1057,766.27,1057,766.27s6.15-50.11,25-48.63,4.42,50.31,4.42,50.31,16.73-32.84,26.92-32.84,0,37,0,37,9.51-10.1,24-10.1c10.59,0,0,16.71-6.49,25.7a13.2,13.2,0,0,1-10.89,5.47Z"
                fill="#ff654d"
              />
              <g clipPath="url(#clipPath-6)">
                <path
                  d="M1055.92,722s-19.09-10.9-18.67,11,6.13,40.84,20.54,42.1,83.73,2.95,83.73,2.95l-7.3,7.29H981.51l-18.79-34.24v-33.5S1039.64,701.75,1055.92,722Z"
                  fill="#b55243"
                  opacity="0.2"
                  style={{ mixBlendMode: "multiply" }}
                />
              </g>
              <path
                d="M40.68,789.6H1158.57s-84.84,48.64-579.94,48.64C192.11,838.24,40.68,789.6,40.68,789.6Z"
                fill="#b55243"
              />
              <g clipPath="url(#clipPath-7)">
                <path
                  d="M546.57,759.29S394,784.76,412.79,802.67c35.14,33.58,430.62,32.41,745.78-13.07h0v70.74L383.2,875.5l-355.79-43-1.26-67.69Z"
                  fill="#b55243"
                  opacity="0.2"
                  style={{ mixBlendMode: "multiply" }}
                />
              </g>
              <rect x="888.41" y="477.29" width="6.16" height="46.42" fill="#4b3757" />
              <g clipPath="url(#clipPath-8)">
                <path
                  d="M897.31,484.55s-5.82-2.73-5.82,7.37v31.79h-5V476.14h11.84Z"
                  fill="#7370bd"
                  opacity="0.2"
                  style={{ mixBlendMode: "multiply" }}
                />
              </g>
              <rect x="877.36" y="477.29" width="6.16" height="46.42" fill="#4b3757" />
              <g clipPath="url(#clipPath-9)">
                <path
                  d="M886.25,484.55s-5.81-2.73-5.81,7.37v31.79h-5V476.14h11.85Z"
                  fill="#7370bd"
                  opacity="0.2"
                  style={{ mixBlendMode: "multiply" }}
                />
              </g>
              <rect x="866.31" y="477.29" width="6.16" height="46.42" fill="#4b3757" />
              <g clipPath="url(#clipPath-10)">
                <path
                  d="M875.2,484.55s-5.82-2.73-5.82,7.37v31.79h-5V476.14h11.84Z"
                  fill="#7370bd"
                  opacity="0.2"
                  style={{ mixBlendMode: "multiply" }}
                />
              </g>
              <rect x="855.25" y="477.29" width="6.16" height="46.42" fill="#4b3757" />
              <g clipPath="url(#clipPath-11)">
                <path
                  d="M864.15,484.55s-5.82-2.73-5.82,7.37v31.79h-5V476.14H865.2Z"
                  fill="#7370bd"
                  opacity="0.2"
                  style={{ mixBlendMode: "multiply" }}
                />
              </g>
              <rect x="844.2" y="477.29" width="6.16" height="46.42" fill="#4b3757" />
              <g clipPath="url(#clipPath-12)">
                <path
                  d="M853.09,484.55s-5.81-2.73-5.81,7.37v31.79h-5V476.14h11.84Z"
                  fill="#7370bd"
                  opacity="0.2"
                  style={{ mixBlendMode: "multiply" }}
                />
              </g>
              <rect x="833.15" y="477.29" width="6.16" height="46.42" fill="#4b3757" />
              <g clipPath="url(#clipPath-13)">
                <path
                  d="M842,484.55s-5.81-2.73-5.81,7.37v31.79h-5V476.14h11.84Z"
                  fill="#7370bd"
                  opacity="0.2"
                  style={{ mixBlendMode: "multiply" }}
                />
              </g>
              <rect x="883.52" y="525.61" width="6" height="40.11" fill="#4b3757" />
              <path
                d="M889.52,533.5h0v-7.89h-6v40.1h3V536.5A3,3,0,0,1,889.52,533.5Z"
                fill="#7370bd"
                opacity="0.2"
                style={{ mixBlendMode: "multiply" }}
              />
              <rect
                x="857.26"
                y="486.97"
                width="10.11"
                height="77.27"
                transform="translate(336.7 1387.92) rotate(-90)"
                fill="#4b3757"
              />
              <path
                d="M835.36,520.55H823.68v10.11h77.26v-5H840.41A5.06,5.06,0,0,1,835.36,520.55Z"
                fill="#7370bd"
                opacity="0.2"
                style={{ mixBlendMode: "multiply" }}
              />
              <rect
                x="857.26"
                y="437.51"
                width="10.11"
                height="77.27"
                transform="translate(386.17 1338.45) rotate(-90)"
                fill="#4b3757"
              />
              <path
                d="M835.36,471.09H823.68v10.1h77.26v-5.05H840.41A5,5,0,0,1,835.36,471.09Z"
                fill="#7370bd"
                opacity="0.2"
                style={{ mixBlendMode: "multiply" }}
              />
              <rect x="256.04" y="375.29" width="256" height="150.32" fill="#ffe8cf" />
              <g clipPath="url(#clipPath-14)">
                <rect
                  x="265.3"
                  y="364.74"
                  width="16"
                  height="180.54"
                  fill="#b55243"
                  opacity="0.2"
                  style={{ mixBlendMode: "multiply" }}
                />
                <rect
                  x="301.09"
                  y="364.74"
                  width="16"
                  height="180.54"
                  fill="#b55243"
                  opacity="0.2"
                  style={{ mixBlendMode: "multiply" }}
                />
                <rect
                  x="336.88"
                  y="364.74"
                  width="16"
                  height="180.54"
                  fill="#b55243"
                  opacity="0.2"
                  style={{ mixBlendMode: "multiply" }}
                />
                <rect
                  x="372.67"
                  y="364.74"
                  width="16"
                  height="180.54"
                  fill="#b55243"
                  opacity="0.2"
                  style={{ mixBlendMode: "multiply" }}
                />
                <rect
                  x="408.46"
                  y="364.74"
                  width="16"
                  height="180.54"
                  fill="#b55243"
                  opacity="0.2"
                  style={{ mixBlendMode: "multiply" }}
                />
                <rect
                  x="444.25"
                  y="364.74"
                  width="16"
                  height="180.54"
                  fill="#b55243"
                  opacity="0.2"
                  style={{ mixBlendMode: "multiply" }}
                />
                <rect
                  x="480.04"
                  y="364.74"
                  width="16"
                  height="180.54"
                  fill="#b55243"
                  opacity="0.2"
                  style={{ mixBlendMode: "multiply" }}
                />
                <rect x="310.64" y="413.54" width="144" height="34.18" fill="#b55243" />
                <g clipPath="url(#clipPath-15)">
                  <g opacity="0.2">
                    <rect
                      x="309.12"
                      y="381.7"
                      width="7.13"
                      height="80.53"
                      transform="translate(389.95 -97.51) rotate(45)"
                      fill="#fff"
                      opacity="0.5"
                    />
                    <rect
                      x="340.79"
                      y="397.76"
                      width="7.13"
                      height="80.53"
                      transform="translate(410.59 -115.2) rotate(45)"
                      fill="#fff"
                      opacity="0.5"
                    />
                    <rect
                      x="377.67"
                      y="397.76"
                      width="7.13"
                      height="80.53"
                      transform="translate(421.39 -141.28) rotate(45)"
                      fill="#fff"
                      opacity="0.5"
                    />
                    <rect
                      x="414.54"
                      y="397.76"
                      width="7.13"
                      height="80.53"
                      transform="translate(432.21 -167.35) rotate(45)"
                      fill="#fff"
                      opacity="0.5"
                    />
                    <rect
                      x="451.42"
                      y="397.76"
                      width="7.13"
                      height="80.53"
                      transform="translate(443.01 -193.43) rotate(45)"
                      fill="#fff"
                      opacity="0.5"
                    />
                    <rect
                      x="319.39"
                      y="388.32"
                      width="5.01"
                      height="80.53"
                      transform="translate(397.32 -102.09) rotate(45)"
                      fill="#fff"
                      opacity="0.5"
                    />
                    <rect
                      x="327.5"
                      y="397.76"
                      width="2.51"
                      height="80.53"
                      transform="translate(405.99 -104.17) rotate(45)"
                      fill="#fff"
                      opacity="0.5"
                    />
                    <rect
                      x="352.77"
                      y="400.68"
                      width="2.51"
                      height="80.53"
                      transform="translate(415.48 -121.18) rotate(45)"
                      fill="#fff"
                      opacity="0.5"
                    />
                    <rect
                      x="393.48"
                      y="400.68"
                      width="2.51"
                      height="80.53"
                      transform="translate(427.44 -149.97) rotate(45)"
                      fill="#fff"
                      opacity="0.5"
                    />
                    <rect
                      x="426.28"
                      y="400.68"
                      width="2.51"
                      height="80.53"
                      transform="translate(437.05 -173.16) rotate(45)"
                      fill="#fff"
                      opacity="0.5"
                    />
                  </g>
                </g>
                <path d="M455.64,448.72h-146V412.54h146Zm-144-2h142V414.54h-142Z" fill="#4b3757" />
                <path d="M304.68,478.39a10.9,10.9,0,1,1-10.9-10.89A10.9,10.9,0,0,1,304.68,478.39Z" fill="#7370bd" />
                <g clipPath="url(#clipPath-16)">
                  <path
                    d="M302.76,470.8s-14.08,1-13.66,8.49,8.42,9.55,13.26,7.51c0,0-5.26,5.37-11.58,4.07s-8.76-7.51-9.47-14.7,8.55-10.7,8.55-10.7l12.9,5.33"
                    fill="#4b3757"
                    opacity="0.2"
                    style={{ mixBlendMode: "multiply" }}
                  />
                </g>
                <path
                  d="M308.94,467.5l-.74-2.05-6.95-22.58H286.2l-6.95,22.58-.73,2.05s4.54,4.42,13.73,4.42c.5,0,1,0,1.48,0s1,0,1.47,0C304.4,471.92,308.94,467.5,308.94,467.5Z"
                  fill="#ffe8cf"
                />
                <g clipPath="url(#clipPath-17)">
                  <path
                    d="M291.41,439.71s-8.24,19.34,2.37,27.79,25.84-10.11,25.84-10.11-1.68,19.27-25.84,19.58-19-19.58-19-19.58S278.15,439.71,291.41,439.71Z"
                    fill="#b55243"
                    opacity="0.2"
                    style={{ mixBlendMode: "multiply" }}
                  />
                  <polygon
                    points="293.78 437.2 293.68 437.2 292.2 475.09 295.25 475.09 293.78 437.2"
                    fill="#b55243"
                    opacity="0.2"
                    style={{ mixBlendMode: "multiply" }}
                  />
                  <polygon
                    points="291.53 437.29 291.43 437.28 286.25 474.85 289.28 475.15 291.53 437.29"
                    fill="#b55243"
                    opacity="0.2"
                    style={{ mixBlendMode: "multiply" }}
                  />
                  <polygon
                    points="289.41 437.72 289.31 437.7 279.14 474.23 282.11 474.93 289.41 437.72"
                    fill="#b55243"
                    opacity="0.2"
                    style={{ mixBlendMode: "multiply" }}
                  />
                  <polygon
                    points="295.92 437.29 296.03 437.28 301.21 474.85 298.17 475.15 295.92 437.29"
                    fill="#b55243"
                    opacity="0.2"
                    style={{ mixBlendMode: "multiply" }}
                  />
                  <polygon
                    points="298.05 437.72 298.15 437.7 308.32 474.23 305.35 474.93 298.05 437.72"
                    fill="#b55243"
                    opacity="0.2"
                    style={{ mixBlendMode: "multiply" }}
                  />
                </g>
                <rect x="273.63" y="488.32" width="40.21" height="10.76" fill="#b55243" />
                <g clipPath="url(#clipPath-18)">
                  <path
                    d="M314.88,489.84s-35.61-2.5-38,3.86c-2.29,6.11.77,7.84.77,7.84H272V486.8H316.6Z"
                    fill="#7370bd"
                    opacity="0.2"
                    style={{ mixBlendMode: "multiply" }}
                  />
                  <rect x="289.38" y="493.26" width="8.7" height="0.88" fill="#ffe8cf" />
                </g>
                <rect x="273.63" y="499.09" width="40.21" height="10.76" fill="#b55243" />
                <g clipPath="url(#clipPath-19)">
                  <path
                    d="M314.88,500.6s-35.61-2.5-38,3.87c-2.29,6.1.77,7.84.77,7.84H272V497.57H316.6Z"
                    fill="#7370bd"
                    opacity="0.2"
                    style={{ mixBlendMode: "multiply" }}
                  />
                  <rect x="289.38" y="504.03" width="8.7" height="0.88" fill="#ffe8cf" />
                </g>
                <rect x="273.63" y="509.85" width="40.21" height="10.76" fill="#b55243" />
                <g clipPath="url(#clipPath-20)">
                  <path
                    d="M314.88,511.37s-35.61-2.5-38,3.86c-2.29,6.11.77,7.84.77,7.84H272V508.33H316.6Z"
                    fill="#7370bd"
                    opacity="0.2"
                    style={{ mixBlendMode: "multiply" }}
                  />
                  <rect x="289.38" y="514.79" width="8.7" height="0.88" fill="#ffe8cf" />
                </g>
                <rect x="272.57" y="487.08" width="42.42" height="2.49" fill="#b55243" />
                <g clipPath="url(#clipPath-21)">
                  <path
                    d="M279.25,485.18s6.58,4.11,37.79,4.11v1.58H270.7v-3.79Z"
                    fill="#7370bd"
                    opacity="0.2"
                    style={{ mixBlendMode: "multiply" }}
                  />
                </g>
                <rect x="452.79" y="488.32" width="40.21" height="10.76" fill="#b55243" />
                <g clipPath="url(#clipPath-22)">
                  <path
                    d="M494,489.84s-35.61-2.5-38,3.86c-2.29,6.11.77,7.84.77,7.84h-5.67V486.8h44.62Z"
                    fill="#7370bd"
                    opacity="0.2"
                    style={{ mixBlendMode: "multiply" }}
                  />
                  <rect x="468.54" y="493.26" width="8.7" height="0.88" fill="#ffe8cf" />
                </g>
                <rect x="452.79" y="499.09" width="40.21" height="10.76" fill="#b55243" />
                <g clipPath="url(#clipPath-23)">
                  <path
                    d="M494,500.6s-35.61-2.5-38,3.87c-2.29,6.1.77,7.84.77,7.84h-5.67V497.57h44.62Z"
                    fill="#7370bd"
                    opacity="0.2"
                    style={{ mixBlendMode: "multiply" }}
                  />
                  <rect x="468.54" y="504.03" width="8.7" height="0.88" fill="#ffe8cf" />
                </g>
                <rect x="452.79" y="509.85" width="40.21" height="10.76" fill="#b55243" />
                <g clipPath="url(#clipPath-24)">
                  <path
                    d="M494,511.37s-35.61-2.5-38,3.86c-2.29,6.11.77,7.84.77,7.84h-5.67V508.33h44.62Z"
                    fill="#7370bd"
                    opacity="0.2"
                    style={{ mixBlendMode: "multiply" }}
                  />
                  <rect x="468.54" y="514.79" width="8.7" height="0.88" fill="#ffe8cf" />
                </g>
                <rect x="451.73" y="487.08" width="42.42" height="2.49" fill="#b55243" />
                <g clipPath="url(#clipPath-25)">
                  <path
                    d="M458.41,485.18s6.58,4.11,37.79,4.11v1.58H449.86v-3.79Z"
                    fill="#7370bd"
                    opacity="0.2"
                    style={{ mixBlendMode: "multiply" }}
                  />
                </g>
                <rect x="323.31" y="463.68" width="119.37" height="36.32" rx="2.79" fill="#4b3757" />
                <g clipPath="url(#clipPath-26)">
                  <path
                    d="M358.36,455.18l-.06,0c-9.29,5.6-5.58,19.89,5.26,20.38l86.33,3.9v22H314.78V463.68Z"
                    fill="#7370bd"
                    opacity="0.2"
                    style={{ mixBlendMode: "multiply" }}
                  />
                </g>
                <rect x="332.78" y="472.55" width="38.53" height="16.74" rx="2.1" fill="#fff" />
                <g clipPath="url(#clipPath-27)">
                  <path
                    d="M346.68,469.39s-16.11,11.53,28.42,11.53v6.47H327.73l1-16.1Z"
                    fill="#7370bd"
                    opacity="0.2"
                    style={{ mixBlendMode: "multiply" }}
                  />
                </g>
                <rect x="394.67" y="472.55" width="38.53" height="16.74" rx="2.1" fill="#fff" />
                <g clipPath="url(#clipPath-28)">
                  <path
                    d="M408.57,469.39S392.46,480.92,437,480.92v6.47H389.62l1-16.1Z"
                    fill="#7370bd"
                    opacity="0.2"
                    style={{ mixBlendMode: "multiply" }}
                  />
                </g>
                <rect x="317.04" y="481.84" width="132.85" height="22.42" rx="2.4" fill="#fff" />
                <g clipPath="url(#clipPath-29)">
                  <path
                    d="M365.1,476.55s-8.85,6.95,3.79,7.16c11.06.18,63.49.05,76.37,0a2.84,2.84,0,0,1,2.85,2.85v17.69H315.41V480.92Z"
                    fill="#7370bd"
                    opacity="0.2"
                    style={{ mixBlendMode: "multiply" }}
                  />
                </g>
                <polygon points="438.94 521.5 435.78 521.5 434.52 507.61 440.2 507.61 438.94 521.5" fill="#b55243" />
                <g clipPath="url(#clipPath-30)">
                  <path
                    d="M441.31,510.87s-2.29-2.32-3.95,3.68,0,8.53,0,8.53H433.2L432,504.26h10.63Z"
                    fill="#b55243"
                    opacity="0.2"
                    style={{ mixBlendMode: "multiply" }}
                  />
                </g>
                <polygon points="330.31 521.5 327.15 521.5 325.89 507.61 331.57 507.61 330.31 521.5" fill="#b55243" />
                <g clipPath="url(#clipPath-31)">
                  <path
                    d="M332.68,510.87s-2.29-2.32-3.95,3.68,0,8.53,0,8.53h-4.16l-1.16-18.82H334Z"
                    fill="#b55243"
                    opacity="0.2"
                    style={{ mixBlendMode: "multiply" }}
                  />
                </g>
                <path
                  d="M321.31,485.18h124.3a1.48,1.48,0,0,1,1.48,1.48v24.2a0,0,0,0,1,0,0H319.83a0,0,0,0,1,0,0v-24.2A1.48,1.48,0,0,1,321.31,485.18Z"
                  fill="#ffea97"
                />
                <g clipPath="url(#clipPath-32)">
                  <path
                    d="M356.46,483s-12,14.47,1.27,20.5,97.89,4.59,97.89,4.59v6.51H317.1V483.25Z"
                    fill="#b55243"
                    opacity="0.2"
                    style={{ mixBlendMode: "multiply" }}
                  />
                </g>
                <polygon
                  points="363.15 380.34 274.99 480.92 496.04 480.92 407.89 380.34 363.15 380.34"
                  fill="url(#Degradado_sin_nombre_3)"
                  style={{ mixBlendMode: "overlay" }}
                />
                <path
                  d="M256,536.34S264.68,442,383.2,411.16s156.66-20.1,156.66-20.1v-18.3H253.14Z"
                  fill="#b55243"
                  opacity="0.2"
                  style={{ mixBlendMode: "multiply" }}
                />
                <rect x="463.41" y="461.18" width="18.74" height="24.84" fill="#d3d2ff" />
                <g clipPath="url(#clipPath-33)">
                  <g opacity="0.5" style={{ mixBlendMode: "overlay" }}>
                    <rect
                      x="464.89"
                      y="451.29"
                      width="4.21"
                      height="27.79"
                      transform="translate(465.71 -193.96) rotate(45)"
                      fill="#fff"
                    />
                    <rect
                      x="470.81"
                      y="455.91"
                      width="1.6"
                      height="27.79"
                      transform="translate(470.33 -195.88) rotate(45)"
                      fill="#fff"
                    />
                    <rect
                      x="478.71"
                      y="467.99"
                      width="1.6"
                      height="27.79"
                      transform="translate(481.19 -197.92) rotate(45)"
                      fill="#fff"
                    />
                    <rect
                      x="474.49"
                      y="465.96"
                      width="3.29"
                      height="27.79"
                      transform="translate(478.76 -196.13) rotate(45)"
                      fill="#fff"
                    />
                  </g>
                </g>
                <path d="M483.15,487H462.41V460.18h20.74Zm-18.74-2h16.74V462.18H464.41Z" fill="#4b3757" />
                <rect
                  id="Bedroom_Dark"
                  style={{ display: this.state.rooms.find((r) => r.Name === "Bedroom").displayStyle }}
                  x="256.04"
                  y="373.32"
                  width="256"
                  height="152.29"
                  opacity="0.9"
                />
              </g>
              <rect x="512.04" y="375.29" width="165.05" height="150.32" fill="#ead16c" />
              <g clipPath="url(#clipPath-34)">
                <rect x="500.25" y="511.71" width="185.26" height="20.41" fill="#b55243" />
                <rect x="541.1" y="399.71" width="31.58" height="45.14" fill="#ff8d7b" />
                <g clipPath="url(#clipPath-35)">
                  <g opacity="0.2">
                    <rect
                      x="535.61"
                      y="362.48"
                      width="7.13"
                      height="80.53"
                      transform="translate(442.7 -263.3) rotate(45)"
                      fill="#fff"
                      opacity="0.5"
                    />
                    <rect
                      x="567.29"
                      y="378.54"
                      width="7.13"
                      height="80.53"
                      transform="translate(463.34 -280.99) rotate(45)"
                      fill="#fff"
                      opacity="0.5"
                    />
                    <rect
                      x="545.88"
                      y="369.1"
                      width="5.01"
                      height="80.53"
                      transform="translate(450.06 -267.87) rotate(45)"
                      fill="#fff"
                      opacity="0.5"
                    />
                    <rect
                      x="553.99"
                      y="378.54"
                      width="2.51"
                      height="80.53"
                      transform="translate(458.77 -269.95) rotate(45)"
                      fill="#fff"
                      opacity="0.5"
                    />
                    <rect
                      x="579.27"
                      y="381.46"
                      width="2.51"
                      height="80.53"
                      transform="translate(468.23 -286.97) rotate(45)"
                      fill="#fff"
                      opacity="0.5"
                    />
                  </g>
                </g>
                <path d="M573.68,445.85H540.1V398.71h33.58Zm-31.58-2h29.58V400.71H542.1Z" fill="#4b3757" />
                <rect x="586.51" y="415.82" width="59.31" height="29.03" fill="#7370bd" />
                <g clipPath="url(#clipPath-36)">
                  <g opacity="0.2">
                    <rect
                      x="592.75"
                      y="381.4"
                      width="7.13"
                      height="80.53"
                      transform="translate(472.83 -298.16) rotate(45)"
                      fill="#fff"
                      opacity="0.5"
                    />
                    <rect
                      x="624.42"
                      y="397.46"
                      width="7.13"
                      height="80.53"
                      transform="translate(493.47 -315.85) rotate(45)"
                      fill="#fff"
                      opacity="0.5"
                    />
                    <rect
                      x="603.02"
                      y="388.02"
                      width="5.01"
                      height="80.53"
                      transform="translate(480.2 -302.73) rotate(45)"
                      fill="#fff"
                      opacity="0.5"
                    />
                    <rect
                      x="611.13"
                      y="397.46"
                      width="2.51"
                      height="80.53"
                      transform="translate(488.88 -304.81) rotate(45)"
                      fill="#fff"
                      opacity="0.5"
                    />
                    <rect
                      x="636.4"
                      y="400.38"
                      width="2.51"
                      height="80.53"
                      transform="translate(498.35 -321.83) rotate(45)"
                      fill="#fff"
                      opacity="0.5"
                    />
                  </g>
                </g>
                <path d="M646.82,445.85H585.51v-31h61.31Zm-59.31-2h57.31v-27H587.51Z" fill="#4b3757" />
                <rect x="541.1" y="452.87" width="31.58" height="16.96" fill="#ffb4a9" />
                <g clipPath="url(#clipPath-37)">
                  <g opacity="0.2">
                    <rect
                      x="547.92"
                      y="436.43"
                      width="3.34"
                      height="37.71"
                      transform="translate(482.91 -255.27) rotate(45)"
                      fill="#fff"
                      opacity="0.5"
                    />
                    <rect
                      x="562.75"
                      y="443.96"
                      width="3.34"
                      height="37.71"
                      transform="translate(492.6 -263.55) rotate(45)"
                      fill="#fff"
                      opacity="0.5"
                    />
                    <rect
                      x="552.73"
                      y="439.53"
                      width="2.35"
                      height="37.71"
                      transform="translate(486.32 -257.4) rotate(45)"
                      fill="#fff"
                      opacity="0.5"
                    />
                    <rect
                      x="556.53"
                      y="443.96"
                      width="1.17"
                      height="37.71"
                      transform="translate(490.43 -258.38) rotate(45)"
                      fill="#fff"
                      opacity="0.5"
                    />
                    <rect
                      x="568.36"
                      y="445.32"
                      width="1.17"
                      height="37.71"
                      transform="translate(494.86 -266.35) rotate(45)"
                      fill="#fff"
                      opacity="0.5"
                    />
                  </g>
                </g>
                <path d="M573.68,470.83H540.1v-19h33.58Zm-31.58-2h29.58v-15H542.1Z" fill="#4b3757" />
                <rect x="586.51" y="452.87" width="31.58" height="16.96" fill="#ff8d7b" />
                <g clipPath="url(#clipPath-38)">
                  <g opacity="0.2">
                    <rect
                      x="611.38"
                      y="443.75"
                      width="3.98"
                      height="44.87"
                      transform="translate(717.44 1229.54) rotate(-135)"
                      fill="#fff"
                      opacity="0.5"
                    />
                    <rect
                      x="593.73"
                      y="434.8"
                      width="3.98"
                      height="44.87"
                      transform="translate(693.64 1201.78) rotate(-135)"
                      fill="#fff"
                      opacity="0.5"
                    />
                    <rect
                      x="606.84"
                      y="440.06"
                      width="2.79"
                      height="44.87"
                      transform="translate(711.29 1219.61) rotate(-135)"
                      fill="#fff"
                      opacity="0.5"
                    />
                    <rect
                      x="603.72"
                      y="434.8"
                      width="1.4"
                      height="44.87"
                      transform="translate(708.56 1207.92) rotate(-135.01)"
                      fill="#fff"
                      opacity="0.5"
                    />
                    <rect
                      x="589.63"
                      y="433.17"
                      width="1.4"
                      height="44.87"
                      transform="translate(685.6 1195.2) rotate(-135)"
                      fill="#fff"
                      opacity="0.5"
                    />
                  </g>
                </g>
                <path d="M619.09,470.83H585.51v-19h33.58Zm-31.58-2h29.58v-15H587.51Z" fill="#4b3757" />
                <rect x="624.05" y="452.87" width="21.77" height="16.96" fill="#d3d2ff" />
                <g clipPath="url(#clipPath-39)">
                  <g opacity="0.2">
                    <rect
                      x="627.41"
                      y="439.44"
                      width="2.9"
                      height="32.77"
                      transform="translate(506.54 -311.17) rotate(45)"
                      fill="#fff"
                      opacity="0.5"
                    />
                    <rect
                      x="640.29"
                      y="445.98"
                      width="2.9"
                      height="32.77"
                      transform="translate(514.9 -318.36) rotate(45)"
                      fill="#fff"
                      opacity="0.5"
                    />
                    <rect
                      x="631.59"
                      y="442.13"
                      width="2.04"
                      height="32.77"
                      transform="translate(509.45 -313.01) rotate(45)"
                      fill="#fff"
                      opacity="0.5"
                    />
                    <rect
                      x="634.89"
                      y="445.98"
                      width="1.02"
                      height="32.77"
                      transform="translate(512.93 -313.85) rotate(44.99)"
                      fill="#fff"
                      opacity="0.5"
                    />
                    <rect
                      x="645.17"
                      y="447.16"
                      width="1.02"
                      height="32.77"
                      transform="translate(516.78 -320.78) rotate(44.99)"
                      fill="#fff"
                      opacity="0.5"
                    />
                  </g>
                </g>
                <path d="M646.82,470.83H623.05v-19h23.77Zm-21.77-2h19.77v-15H625.05Z" fill="#4b3757" />
                <path
                  d="M510.83,532.24s9.79-85.37,75.81-125.18c50-30.18,93.4-20.1,93.4-20.1v-18.3H509.1Z"
                  fill="#b55243"
                  opacity="0.2"
                  style={{ mixBlendMode: "multiply" }}
                />
                <polygon
                  points="577.07 380.34 526.51 480.92 653.27 480.92 602.72 380.34 577.07 380.34"
                  fill="url(#Degradado_sin_nombre_3-2)"
                  style={{ mixBlendMode: "overlay" }}
                />
                <rect
                  id="Hallway_Dark"
                  style={{ display: this.state.rooms.find((r) => r.Name === "Hallway").displayStyle }}
                  x="510.74"
                  y="373.32"
                  width="166.36"
                  height="152.29"
                  opacity="0.9"
                />
              </g>
              <rect x="673.36" y="375.29" width="150.32" height="150.32" fill="#ffe8cf" />
              <g clipPath="url(#clipPath-40)">
                <rect x="689.62" y="470.66" width="122.53" height="5.05" fill="#b55243" />
                <g clipPath="url(#clipPath-41)">
                  <path
                    d="M705.31,465s-2.64,10.85,109.25,9.53l2.1,2.1H686.78V463.39Z"
                    fill="#b55243"
                    opacity="0.2"
                    style={{ mixBlendMode: "multiply" }}
                  />
                </g>
                <rect x="697.71" y="475.71" width="106.35" height="15.53" fill="#b55243" />
                <g clipPath="url(#clipPath-42)">
                  <path
                    d="M717.73,473.18s-3.16,18.06,91.58,18.06-10.11,12.89-10.11,12.89H689.62V470.66Z"
                    fill="#b55243"
                    opacity="0.2"
                    style={{ mixBlendMode: "multiply" }}
                  />
                </g>
                <rect x="692.46" y="475.71" width="5.25" height="44.84" fill="#b55243" />
                <g clipPath="url(#clipPath-43)">
                  <path
                    d="M699.62,478.87s-4.23,0-4.53,6.63-1.78,38.21-1.78,38.21h-3.69V474.66h12.11Z"
                    fill="#b55243"
                    opacity="0.2"
                    style={{ mixBlendMode: "multiply" }}
                  />
                </g>
                <rect x="739.2" y="481.39" width="23.37" height="4.11" fill="#fff" />
                <rect x="804.06" y="475.71" width="5.25" height="44.84" fill="#b55243" />
                <g clipPath="url(#clipPath-44)">
                  <path
                    d="M811.22,478.87s-4.23,0-4.54,6.63-1.78,38.21-1.78,38.21h-3.68V474.66h12.1Z"
                    fill="#b55243"
                    opacity="0.2"
                    style={{ mixBlendMode: "multiply" }}
                  />
                </g>
                <path d="M701.73,432.76h-8.42V405.39h8.42Z" fill="#b55243" />
                <g clipPath="url(#clipPath-45)">
                  <rect x="691.54" y="408.97" width="11.96" height="3.17" fill="#ffea97" />
                  <path
                    d="M696.39,403.61s-3.08,27.89,6,27.89v2.95h-9.79V404.13Z"
                    fill="#b55243"
                    opacity="0.2"
                    style={{ mixBlendMode: "multiply" }}
                  />
                </g>
                <path d="M802.67,432.76H782.79a4,4,0,0,1-4-4h0a4,4,0,0,1,4-4h19.88Z" fill="#4b3757" />
                <g clipPath="url(#clipPath-46)">
                  <path
                    d="M795.6,423.8s-12.38-.59-14.62,2.68c-1,1.42-1.49,5.46,2.75,5.46h20v1.77H778.23V423.33Z"
                    fill="#7370bd"
                    opacity="0.2"
                    style={{ mixBlendMode: "multiply" }}
                  />
                </g>
                <path
                  d="M802.67,426.48H783.73a2.28,2.28,0,0,0-2.28,2.27h0a2.28,2.28,0,0,0,2.28,2.28h18.94Z"
                  fill="#ffe8cf"
                />
                <g clipPath="url(#clipPath-47)">
                  <path
                    d="M785.77,425.22s-3.18,1.26-2.59,3.53,21.93,1.3,21.93,1.3v1.89h-25v-6Z"
                    fill="#b55243"
                    opacity="0.2"
                    style={{ mixBlendMode: "multiply" }}
                  />
                </g>
                <path d="M802.67,424.75H782.79a4,4,0,0,1-4-4h0a4,4,0,0,1,4-4h19.88Z" fill="#ffea97" />
                <g clipPath="url(#clipPath-48)">
                  <path
                    d="M795.6,415.79s-12.38-.59-14.62,2.67c-1,1.42-1.49,5.46,2.75,5.46h20v1.77H778.23V415.31Z"
                    fill="#7370bd"
                    opacity="0.2"
                    style={{ mixBlendMode: "multiply" }}
                  />
                </g>
                <path
                  d="M802.67,418.46H783.73a2.28,2.28,0,0,0-2.28,2.28h0a2.28,2.28,0,0,0,2.28,2.28h18.94Z"
                  fill="#ffe8cf"
                />
                <g clipPath="url(#clipPath-49)">
                  <path
                    d="M785.77,417.2s-3.18,1.26-2.59,3.54S805.11,422,805.11,422v1.89h-25v-6Z"
                    fill="#b55243"
                    opacity="0.2"
                    style={{ mixBlendMode: "multiply" }}
                  />
                </g>
                <path d="M771.71,432.76h-8.42V405.39h8.42Z" fill="#4b3757" />
                <g clipPath="url(#clipPath-50)">
                  <rect x="761.52" y="408.97" width="11.96" height="3.17" fill="#ffea97" />
                  <path
                    d="M766.37,403.61s-3.08,27.89,6,27.89v2.95h-9.79V404.13Z"
                    fill="#b55243"
                    opacity="0.2"
                    style={{ mixBlendMode: "multiply" }}
                  />
                </g>
                <path d="M780,432.76H771.6V412.14H780Z" fill="#b55243" />
                <g clipPath="url(#clipPath-51)">
                  <rect x="769.84" y="414.83" width="11.96" height="2.39" fill="#ffea97" />
                  <path
                    d="M774.68,410.79s-3.08,21,6,21V434h-9.79V411.19Z"
                    fill="#b55243"
                    opacity="0.2"
                    style={{ mixBlendMode: "multiply" }}
                  />
                </g>
                <path d="M746.64,431.44l-8.2,1.92-6.25-26.64,8.19-1.92Z" fill="#7370bd" />
                <g clipPath="url(#clipPath-52)">
                  <rect
                    x="731.49"
                    y="409.19"
                    width="11.96"
                    height="3.17"
                    transform="translate(-74.33 179.3) rotate(-13.2)"
                    fill="#ffea97"
                  />
                  <path
                    d="M734.78,404.27s3.37,27.86,12.18,25.8l.67,2.87-9.52,2.23-6.93-29.51Z"
                    fill="#b55243"
                    opacity="0.2"
                    style={{ mixBlendMode: "multiply" }}
                  />
                </g>
                <path
                  d="M733.73,432.76H707.1a5.36,5.36,0,0,1-5.37-5.37h0A5.36,5.36,0,0,1,707.1,422h26.63Z"
                  fill="#4b3757"
                />
                <g clipPath="url(#clipPath-53)">
                  <path
                    d="M724.25,420.76s-16.58-.79-19.58,3.58c-1.3,1.91-2,7.32,3.69,7.32H735.1V434H701v-13.9Z"
                    fill="#7370bd"
                    opacity="0.2"
                    style={{ mixBlendMode: "multiply" }}
                  />
                </g>
                <path d="M733.73,424.34H708.36a3,3,0,0,0-3.05,3.05h0a3.05,3.05,0,0,0,3.05,3.06h25.37Z" fill="#ffe8cf" />
                <g clipPath="url(#clipPath-54)">
                  <path
                    d="M711.1,422.66s-4.27,1.68-3.48,4.73S737,429.13,737,429.13v2.53H703.52v-8Z"
                    fill="#b55243"
                    opacity="0.2"
                    style={{ mixBlendMode: "multiply" }}
                  />
                </g>
                <path
                  d="M733.73,422H707.1a5.37,5.37,0,0,1-5.37-5.37h0a5.36,5.36,0,0,1,5.37-5.37h26.63Z"
                  fill="#d3d2ff"
                />
                <g clipPath="url(#clipPath-55)">
                  <path
                    d="M724.25,410s-16.58-.79-19.58,3.58c-1.3,1.9-2,7.31,3.69,7.31H735.1v2.37H701v-13.9Z"
                    fill="#7370bd"
                    opacity="0.2"
                    style={{ mixBlendMode: "multiply" }}
                  />
                </g>
                <path d="M733.73,413.61H708.36a3,3,0,0,0-3.05,3.05h0a3,3,0,0,0,3.05,3h25.37Z" fill="#ffe8cf" />
                <g clipPath="url(#clipPath-56)">
                  <path
                    d="M711.1,411.92s-4.27,1.69-3.48,4.74S737,418.39,737,418.39v2.53H703.52v-8Z"
                    fill="#b55243"
                    opacity="0.2"
                    style={{ mixBlendMode: "multiply" }}
                  />
                </g>
                <path
                  d="M739.09,415h26.15a0,0,0,0,1,0,0v9.58a0,0,0,0,1,0,0H739.09a2.39,2.39,0,0,1-2.39-2.39v-4.79A2.39,2.39,0,0,1,739.09,415Z"
                  transform="translate(1170.72 -331.21) rotate(90)"
                  fill="#ffea97"
                />
                <g clipPath="url(#clipPath-57)">
                  <path
                    d="M756.88,425.57s.71-14.79-3.19-17.46c-1.7-1.17-6.53-1.79-6.53,3.28v23.86h-2.11V404.82h12.39Z"
                    fill="#7370bd"
                    opacity="0.2"
                    style={{ mixBlendMode: "multiply" }}
                  />
                </g>
                <path
                  d="M753.69,434V411.39a2.72,2.72,0,0,0-2.72-2.72h0a2.72,2.72,0,0,0-2.73,2.72V434Z"
                  fill="#ffe8cf"
                />
                <g clipPath="url(#clipPath-58)">
                  <path
                    d="M755.19,413.84s-1.5-3.81-4.22-3.1-1.55,26.2-1.55,26.2h-2.26V407.07h7.15Z"
                    fill="#b55243"
                    opacity="0.2"
                    style={{ mixBlendMode: "multiply" }}
                  />
                </g>
                <path
                  d="M755.75,434V415.39a3.76,3.76,0,0,1,3.76-3.75h0a3.75,3.75,0,0,1,3.76,3.75V434Z"
                  fill="#7370bd"
                />
                <g clipPath="url(#clipPath-59)">
                  <path
                    d="M764.15,427.4s.55-11.6-2.5-13.7c-1.33-.92-5.12-1.4-5.12,2.58V435h-1.66V411.12h9.72Z"
                    fill="#7370bd"
                    opacity="0.2"
                    style={{ mixBlendMode: "multiply" }}
                  />
                </g>
                <path
                  d="M761.65,434V416.28a2.14,2.14,0,0,0-2.14-2.14h0a2.13,2.13,0,0,0-2.13,2.14V434Z"
                  fill="#ffe8cf"
                />
                <g clipPath="url(#clipPath-60)">
                  <path
                    d="M762.83,418.19s-1.18-3-3.32-2.43-1.21,20.55-1.21,20.55h-1.77V412.89h5.6Z"
                    fill="#b55243"
                    opacity="0.2"
                    style={{ mixBlendMode: "multiply" }}
                  />
                </g>
                <rect x="689.62" y="432.76" width="122.53" height="3.16" fill="#b55243" />
                <g clipPath="url(#clipPath-61)">
                  <path
                    d="M730.57,431.92s27.26,4.21,88,3.47v2h-129l-3-4.73,2-1Z"
                    fill="#b55243"
                    opacity="0.2"
                    style={{ mixBlendMode: "multiply" }}
                  />
                </g>
                <path
                  d="M669.93,532.24s8.72-87.1,71.15-125.18c38.75-23.64,87.65-20.1,87.65-20.1v-18.3H668.31Z"
                  fill="#b55243"
                  opacity="0.2"
                  style={{ mixBlendMode: "multiply" }}
                />
                <polygon
                  points="741.58 380.34 691.03 480.92 817.79 480.92 767.24 380.34 741.58 380.34"
                  fill="url(#Degradado_sin_nombre_3-3)"
                  style={{ mixBlendMode: "overlay" }}
                />
                <rect
                  id="Library_Dark"
                  style={{ display: this.state.rooms.find((r) => r.Name === "Library").displayStyle }}
                  x="672.46"
                  y="373.32"
                  width="152.29"
                  height="152.29"
                  opacity="0.9"
                />
              </g>
              <rect x="256.04" y="525.61" width="122.11" height="132" fill="#d3d2ff" />
              <g clipPath="url(#clipPath-62)">
                <g opacity="0.2">
                  <rect x="256.04" y="525.61" width="17.59" height="17.59" fill="#fff" />
                  <rect x="291.23" y="525.61" width="17.59" height="17.59" fill="#fff" />
                  <rect x="326.42" y="525.61" width="17.59" height="17.59" fill="#fff" />
                  <rect x="361.61" y="525.61" width="17.59" height="17.59" fill="#fff" />
                  <rect x="273.86" y="543.16" width="17.59" height="17.59" fill="#fff" />
                  <rect x="309.05" y="543.16" width="17.59" height="17.59" fill="#fff" />
                  <rect x="344.24" y="543.16" width="17.59" height="17.59" fill="#fff" />
                  <rect x="256.04" y="560.42" width="17.59" height="17.59" fill="#fff" />
                  <rect x="291.23" y="560.42" width="17.59" height="17.59" fill="#fff" />
                  <rect x="326.42" y="560.42" width="17.59" height="17.59" fill="#fff" />
                  <rect x="361.61" y="560.42" width="17.59" height="17.59" fill="#fff" />
                  <rect x="273.86" y="577.98" width="17.59" height="17.59" fill="#fff" />
                  <rect x="309.05" y="577.98" width="17.59" height="17.59" fill="#fff" />
                  <rect x="344.24" y="577.98" width="17.59" height="17.59" fill="#fff" />
                  <rect x="256.04" y="595.24" width="17.59" height="17.59" fill="#fff" />
                  <rect x="291.23" y="595.24" width="17.59" height="17.59" fill="#fff" />
                  <rect x="326.42" y="595.24" width="17.59" height="17.59" fill="#fff" />
                  <rect x="361.61" y="595.24" width="17.59" height="17.59" fill="#fff" />
                  <rect x="273.86" y="612.79" width="17.59" height="17.59" fill="#fff" />
                  <rect x="309.05" y="612.79" width="17.59" height="17.59" fill="#fff" />
                  <rect x="344.24" y="612.79" width="17.59" height="17.59" fill="#fff" />
                  <rect x="256.04" y="630.05" width="17.59" height="17.59" fill="#fff" />
                  <rect x="291.23" y="630.05" width="17.59" height="17.59" fill="#fff" />
                  <rect x="326.42" y="630.05" width="17.59" height="17.59" fill="#fff" />
                  <rect x="361.61" y="630.05" width="17.59" height="17.59" fill="#fff" />
                  <rect x="273.86" y="647.61" width="17.59" height="17.59" fill="#fff" />
                  <rect x="309.05" y="647.61" width="17.59" height="17.59" fill="#fff" />
                  <rect x="344.24" y="647.61" width="17.59" height="17.59" fill="#fff" />
                </g>
                <path
                  d="M363.31,620H320.36V565.76a21.47,21.47,0,0,1,21.47-21.47h0a21.48,21.48,0,0,1,21.48,21.47Z"
                  fill="#d3d2ff"
                />
                <g clipPath="url(#clipPath-63)">
                  <rect
                    x="324.68"
                    y="516.47"
                    width="8.42"
                    height="95.05"
                    transform="translate(495.13 -67.37) rotate(45)"
                    fill="#fff"
                    opacity="0.5"
                  />
                  <rect
                    x="352.73"
                    y="565.15"
                    width="8.42"
                    height="95.05"
                    transform="translate(537.77 -72.95) rotate(45)"
                    fill="#fff"
                    opacity="0.5"
                  />
                  <rect
                    x="334.44"
                    y="524.29"
                    width="5.92"
                    height="95.05"
                    transform="translate(503.15 -71.1) rotate(45)"
                    fill="#fff"
                    opacity="0.5"
                  />
                  <rect
                    x="343.57"
                    y="547.97"
                    width="2.96"
                    height="95.05"
                    transform="translate(522.14 -69.57) rotate(45)"
                    fill="#fff"
                    opacity="0.5"
                  />
                </g>
                <path
                  d="M364.31,621H319.36V565.76a22.48,22.48,0,0,1,44.95,0Zm-42.95-2h40.95V565.76a20.48,20.48,0,0,0-40.95,0Z"
                  fill="#4b3757"
                />
                <path
                  d="M351.75,609.36h-2.7a1,1,0,0,1-1-.77l-.43-1.91a1,1,0,0,1,1-1.19h3.56a1,1,0,0,1,.95,1.19l-.42,1.91A1,1,0,0,1,351.75,609.36Z"
                  fill="#7370bd"
                />
                <g clipPath="url(#clipPath-64)">
                  <path
                    d="M350.4,604.86a2,2,0,0,0-1.27,2c0,1.67,4,1.6,4,1.6v.86h-5.88v-3.87Z"
                    fill="#7370bd"
                    opacity="0.2"
                    style={{ mixBlendMode: "multiply" }}
                  />
                </g>
                <path
                  d="M335.68,609.36H333a1,1,0,0,1-1-.77l-.43-1.91a1,1,0,0,1,1-1.19h3.56a1,1,0,0,1,1,1.19l-.43,1.91A1,1,0,0,1,335.68,609.36Z"
                  fill="#7370bd"
                />
                <g clipPath="url(#clipPath-65)">
                  <path
                    d="M334.33,604.86a2,2,0,0,0-1.27,2c0,1.67,4,1.6,4,1.6v.86h-5.88v-3.87Z"
                    fill="#7370bd"
                    opacity="0.2"
                    style={{ mixBlendMode: "multiply" }}
                  />
                </g>
                <path
                  d="M342.19,613.25h0a1.68,1.68,0,0,1-1.67-1.68V593a1.68,1.68,0,0,1,1.67-1.68h0a1.68,1.68,0,0,1,1.68,1.68v18.61A1.68,1.68,0,0,1,342.19,613.25Z"
                  fill="#fff"
                />
                <g clipPath="url(#clipPath-66)">
                  <path
                    d="M343.87,590.61s-2.31.42-2.31,3.9v10.63a2.21,2.21,0,0,0,2.21,2.21h1.37v2.83H339V590.61Z"
                    fill="#7370bd"
                    opacity="0.2"
                    style={{ mixBlendMode: "multiply" }}
                  />
                </g>
                <rect x="310.99" y="611.46" width="30.78" height="44.68" fill="#fff" />
                <g clipPath="url(#clipPath-67)">
                  <path
                    d="M344.39,613.13s-24.87-2.55-24.87,10.83V658.7H308V608.61h36.4Z"
                    fill="#7370bd"
                    opacity="0.2"
                    style={{ mixBlendMode: "multiply" }}
                  />
                  <rect x="337.78" y="628.39" width="1.92" height="10.92" fill="#4b3757" />
                </g>
                <rect x="341.77" y="611.46" width="30.78" height="44.68" fill="#fff" />
                <g clipPath="url(#clipPath-68)">
                  <path
                    d="M375.17,613.13S350.3,610.58,350.3,624V658.7H338.77V608.61h36.4Z"
                    fill="#7370bd"
                    opacity="0.2"
                    style={{ mixBlendMode: "multiply" }}
                  />
                  <rect x="343.87" y="628.39" width="1.92" height="10.92" fill="#4b3757" />
                </g>
                <path d="M273.39,639.89v14h24.34v-3.75h-5.26a4.26,4.26,0,0,1-4.26-4.26v-4" fill="#fff" />
                <g clipPath="url(#clipPath-69)">
                  <path
                    d="M286.47,640.6s-10.65.24-10.65,6.3,24,4.37,24,4.37v4.54H271.71V637.36Z"
                    fill="#7370bd"
                    opacity="0.2"
                    style={{ mixBlendMode: "multiply" }}
                  />
                </g>
                <path
                  d="M288.93,611.5H268.19a2.37,2.37,0,0,1-2.38-2.38h0a2.38,2.38,0,0,1,2.38-2.38h20.74a2.39,2.39,0,0,1,2.38,2.38h0A2.38,2.38,0,0,1,288.93,611.5Z"
                  fill="#fff"
                />
                <g clipPath="url(#clipPath-70)">
                  <path
                    d="M269.2,605.5s-1.76,6.37,23.75,4.74v2H264.46v-6Z"
                    fill="#7370bd"
                    opacity="0.2"
                    style={{ mixBlendMode: "multiply" }}
                  />
                </g>
                <path
                  d="M268.43,630.24V611.5h15.33v23.39h15a.87.87,0,0,1,.64,1.47l-1.8,1.94a11.89,11.89,0,0,1-8.74,3.83h-8.53A11.89,11.89,0,0,1,268.43,630.24Z"
                  fill="#fff"
                />
                <g clipPath="url(#clipPath-71)">
                  <path
                    d="M285.73,615.29s-12.34-.63-12.34,7.58-.29,21.19,23.92,17c0,0-.79,4.24-22.5,4.24s-6.38-35-6.38-35h22.36Z"
                    fill="#7370bd"
                    opacity="0.2"
                    style={{ mixBlendMode: "multiply" }}
                  />
                </g>
                <path
                  d="M283.76,634.89h16.58a1.82,1.82,0,0,0,1.81-1.82h0a1.81,1.81,0,0,0-1.81-1.81H283.76Z"
                  fill="#fff"
                />
                <g clipPath="url(#clipPath-72)">
                  <path
                    d="M286.93,630s.69,5.26,16.69,3.89v1H281.73v-3.63Z"
                    fill="#7370bd"
                    opacity="0.2"
                    style={{ mixBlendMode: "multiply" }}
                  />
                </g>
                <polygon
                  points="284.03 615.28 281.31 615.28 281.31 614.29 284.03 614.01 284.03 615.28"
                  fill="#4b3757"
                />
                <rect x="275.04" y="566.42" width="18.71" height="27.16" fill="#fff" />
                <g clipPath="url(#clipPath-73)">
                  <path
                    d="M295.34,567.43s-15.12-1.55-15.12,6.58v21.12h-7V564.68h22.13Z"
                    fill="#7370bd"
                    opacity="0.2"
                    style={{ mixBlendMode: "multiply" }}
                  />
                  <rect x="291.32" y="576.71" width="1.17" height="6.64" fill="#4b3757" />
                </g>
                <rect x="293.75" y="566.42" width="18.71" height="27.16" fill="#fff" />
                <g clipPath="url(#clipPath-74)">
                  <path
                    d="M314.05,567.43s-15.12-1.55-15.12,6.58v21.12h-7V564.68h22.13Z"
                    fill="#7370bd"
                    opacity="0.2"
                    style={{ mixBlendMode: "multiply" }}
                  />
                  <rect x="295.03" y="576.71" width="1.17" height="6.64" fill="#4b3757" />
                </g>
                <path
                  d="M254.61,662.66s-2.2-75.61,54.44-108.33c46.51-26.86,89.31-14.18,89.31-14.18V524.72H253.14Z"
                  fill="#4b3757"
                  opacity="0.2"
                  style={{ mixBlendMode: "multiply" }}
                />
                <rect x="306.78" y="608.61" width="69.26" height="4.44" fill="#4b3757" />
                <polygon
                  points="306.44 528.12 255.88 628.7 382.64 628.7 332.09 528.12 306.44 528.12"
                  fill="url(#Degradado_sin_nombre_3-4)"
                  style={{ mixBlendMode: "overlay" }}
                />
                <rect
                  id="Bathroom_Dark"
                  style={{ display: this.state.rooms.find((r) => r.Name === "Bathroom").displayStyle }}
                  x="255.48"
                  y="525.61"
                  width="122.66"
                  height="132"
                  opacity="0.9"
                />
              </g>
              <rect x="378.15" y="525.61" width="216.8" height="132" fill="#ead16c" />
              <g clipPath="url(#clipPath-75)">
                <rect x="360.83" y="644.55" width="242.41" height="28.63" fill="#b55243" />
                <rect
                  x="390.04"
                  y="652.16"
                  width="13.88"
                  height="3.88"
                  transform="translate(-257.11 1051.08) rotate(-90)"
                  fill="#4b3757"
                />
                <g clipPath="url(#clipPath-76)">
                  <path
                    d="M393.62,649.44s5.91-2,3.36,11.6,5.28,0,5.28,0L401,645.65l-8.51-.57Z"
                    fill="#7370bd"
                    opacity="0.2"
                    style={{ mixBlendMode: "multiply" }}
                  />
                </g>
                <rect
                  x="382.04"
                  y="643.01"
                  width="33.76"
                  height="4.15"
                  transform="translate(797.84 1290.16) rotate(180)"
                  fill="#ffe8cf"
                />
                <g clipPath="url(#clipPath-77)">
                  <path
                    d="M408.94,640.21s1.79,7.75-30.31,6.94v3.11h39.6v-8.79Z"
                    fill="#7370bd"
                    opacity="0.2"
                    style={{ mixBlendMode: "multiply" }}
                  />
                </g>
                <rect
                  x="406.92"
                  y="638.27"
                  width="13.88"
                  height="3.88"
                  transform="translate(-226.35 1054.07) rotate(-90)"
                  fill="#4b3757"
                />
                <g clipPath="url(#clipPath-78)">
                  <path
                    d="M410.5,635.56s5.91-2,3.36,11.59,5.28,0,5.28,0l-1.27-15.38-8.51-.57Z"
                    fill="#7370bd"
                    opacity="0.2"
                    style={{ mixBlendMode: "multiply" }}
                  />
                </g>
                <rect
                  x="406.99"
                  y="638.16"
                  width="13.88"
                  height="3.88"
                  transform="translate(-226.17 1054.03) rotate(-90)"
                  fill="#4b3757"
                />
                <g clipPath="url(#clipPath-79)">
                  <path
                    d="M410.57,635.45s5.91-2,3.36,11.59,5.28,0,5.28,0l-1.27-15.38-8.51-.57Z"
                    fill="#7370bd"
                    opacity="0.2"
                    style={{ mixBlendMode: "multiply" }}
                  />
                </g>
                <rect
                  x="398.99"
                  y="629.02"
                  width="33.76"
                  height="4.15"
                  transform="translate(831.74 1262.18) rotate(180)"
                  fill="#ffe8cf"
                />
                <g clipPath="url(#clipPath-80)">
                  <path
                    d="M425.89,626.22s1.79,7.74-30.31,6.94v3.1h39.6v-8.78Z"
                    fill="#7370bd"
                    opacity="0.2"
                    style={{ mixBlendMode: "multiply" }}
                  />
                </g>
                <rect
                  x="423.87"
                  y="624.28"
                  width="13.88"
                  height="3.88"
                  transform="translate(-195.41 1057.03) rotate(-90)"
                  fill="#4b3757"
                />
                <g clipPath="url(#clipPath-81)">
                  <path
                    d="M427.45,621.57s5.91-2,3.36,11.59,5.28,0,5.28,0l-1.27-15.38-8.51-.57Z"
                    fill="#7370bd"
                    opacity="0.2"
                    style={{ mixBlendMode: "multiply" }}
                  />
                </g>
                <rect
                  x="423.94"
                  y="624.17"
                  width="13.88"
                  height="3.88"
                  transform="translate(-195.23 1056.99) rotate(-90)"
                  fill="#4b3757"
                />
                <g clipPath="url(#clipPath-82)">
                  <path
                    d="M427.52,621.46s5.9-2,3.36,11.59,5.27,0,5.27,0l-1.26-15.38-8.51-.57Z"
                    fill="#7370bd"
                    opacity="0.2"
                    style={{ mixBlendMode: "multiply" }}
                  />
                </g>
                <rect
                  x="415.94"
                  y="615.03"
                  width="33.76"
                  height="4.15"
                  transform="translate(865.63 1234.2) rotate(180)"
                  fill="#ffe8cf"
                />
                <g clipPath="url(#clipPath-83)">
                  <path
                    d="M442.84,612.23s1.79,7.74-30.31,6.94v3.1h39.6v-8.78Z"
                    fill="#7370bd"
                    opacity="0.2"
                    style={{ mixBlendMode: "multiply" }}
                  />
                </g>
                <rect
                  x="440.82"
                  y="610.29"
                  width="13.88"
                  height="3.88"
                  transform="translate(-164.47 1059.99) rotate(-90)"
                  fill="#4b3757"
                />
                <g clipPath="url(#clipPath-84)">
                  <path
                    d="M444.4,607.58s5.9-2,3.36,11.59,5.27,0,5.27,0l-1.26-15.38-8.51-.57Z"
                    fill="#7370bd"
                    opacity="0.2"
                    style={{ mixBlendMode: "multiply" }}
                  />
                </g>
                <rect
                  x="440.89"
                  y="610.18"
                  width="13.88"
                  height="3.88"
                  transform="translate(-164.29 1059.95) rotate(-90)"
                  fill="#4b3757"
                />
                <g clipPath="url(#clipPath-85)">
                  <path
                    d="M444.47,607.47s5.9-2,3.36,11.59,5.27,0,5.27,0l-1.26-15.38-8.51-.57Z"
                    fill="#7370bd"
                    opacity="0.2"
                    style={{ mixBlendMode: "multiply" }}
                  />
                </g>
                <rect
                  x="432.89"
                  y="601.03"
                  width="33.76"
                  height="4.15"
                  transform="translate(899.53 1206.21) rotate(180)"
                  fill="#ffe8cf"
                />
                <g clipPath="url(#clipPath-86)">
                  <path
                    d="M459.78,598.24s1.8,7.74-30.31,6.94v3.1h39.6V599.5Z"
                    fill="#7370bd"
                    opacity="0.2"
                    style={{ mixBlendMode: "multiply" }}
                  />
                </g>
                <rect
                  x="457.76"
                  y="596.3"
                  width="13.88"
                  height="3.88"
                  transform="translate(-133.53 1062.94) rotate(-90)"
                  fill="#4b3757"
                />
                <g clipPath="url(#clipPath-87)">
                  <path
                    d="M461.34,593.59s5.91-2,3.36,11.59,5.28,0,5.28,0l-1.26-15.38-8.52-.57Z"
                    fill="#7370bd"
                    opacity="0.2"
                    style={{ mixBlendMode: "multiply" }}
                  />
                </g>
                <rect
                  x="457.83"
                  y="596.19"
                  width="13.88"
                  height="3.88"
                  transform="translate(-133.35 1062.9) rotate(-90)"
                  fill="#4b3757"
                />
                <g clipPath="url(#clipPath-88)">
                  <path
                    d="M461.41,593.48s5.91-2,3.36,11.59,5.28,0,5.28,0l-1.26-15.38-8.52-.57Z"
                    fill="#7370bd"
                    opacity="0.2"
                    style={{ mixBlendMode: "multiply" }}
                  />
                </g>
                <rect
                  x="449.84"
                  y="587.04"
                  width="33.76"
                  height="4.15"
                  transform="translate(933.43 1178.23) rotate(180)"
                  fill="#ffe8cf"
                />
                <g clipPath="url(#clipPath-89)">
                  <path
                    d="M476.73,584.25s1.79,7.74-30.31,6.94v3.1H486v-8.78Z"
                    fill="#7370bd"
                    opacity="0.2"
                    style={{ mixBlendMode: "multiply" }}
                  />
                </g>
                <rect
                  x="474.71"
                  y="582.31"
                  width="13.88"
                  height="3.88"
                  transform="translate(-102.59 1065.9) rotate(-90)"
                  fill="#4b3757"
                />
                <g clipPath="url(#clipPath-90)">
                  <path
                    d="M478.29,579.6s5.91-2,3.36,11.59,5.28,0,5.28,0l-1.27-15.38-8.51-.58Z"
                    fill="#7370bd"
                    opacity="0.2"
                    style={{ mixBlendMode: "multiply" }}
                  />
                </g>
                <rect
                  x="474.78"
                  y="582.2"
                  width="13.88"
                  height="3.88"
                  transform="translate(-102.42 1065.86) rotate(-90)"
                  fill="#4b3757"
                />
                <g clipPath="url(#clipPath-91)">
                  <path
                    d="M478.36,579.49s5.91-2,3.36,11.59,5.28,0,5.28,0l-1.27-15.38-8.51-.58Z"
                    fill="#7370bd"
                    opacity="0.2"
                    style={{ mixBlendMode: "multiply" }}
                  />
                </g>
                <rect
                  x="466.78"
                  y="573.05"
                  width="33.76"
                  height="4.15"
                  transform="translate(967.32 1150.25) rotate(180)"
                  fill="#ffe8cf"
                />
                <g clipPath="url(#clipPath-92)">
                  <path
                    d="M493.68,570.26s1.79,7.74-30.31,6.94v3.1H503v-8.79Z"
                    fill="#7370bd"
                    opacity="0.2"
                    style={{ mixBlendMode: "multiply" }}
                  />
                </g>
                <rect
                  x="491.66"
                  y="568.32"
                  width="13.88"
                  height="3.88"
                  transform="translate(-71.66 1068.86) rotate(-90)"
                  fill="#4b3757"
                />
                <g clipPath="url(#clipPath-93)">
                  <path
                    d="M495.24,565.6s5.91-2,3.36,11.6,5.28,0,5.28,0l-1.27-15.38-8.51-.58Z"
                    fill="#7370bd"
                    opacity="0.2"
                    style={{ mixBlendMode: "multiply" }}
                  />
                </g>
                <rect
                  x="491.73"
                  y="568.21"
                  width="13.88"
                  height="3.88"
                  transform="translate(-71.48 1068.82) rotate(-90)"
                  fill="#4b3757"
                />
                <g clipPath="url(#clipPath-94)">
                  <path
                    d="M495.31,565.49s5.91-2,3.36,11.6,5.28,0,5.28,0l-1.27-15.38-8.51-.58Z"
                    fill="#7370bd"
                    opacity="0.2"
                    style={{ mixBlendMode: "multiply" }}
                  />
                </g>
                <rect
                  x="483.73"
                  y="559.06"
                  width="33.76"
                  height="4.15"
                  transform="translate(1001.22 1122.27) rotate(180)"
                  fill="#ffe8cf"
                />
                <g clipPath="url(#clipPath-95)">
                  <path
                    d="M510.63,556.26s1.79,7.75-30.31,7v3.1h39.6v-8.79Z"
                    fill="#7370bd"
                    opacity="0.2"
                    style={{ mixBlendMode: "multiply" }}
                  />
                </g>
                <rect
                  x="508.61"
                  y="554.33"
                  width="13.88"
                  height="3.88"
                  transform="translate(-40.72 1071.81) rotate(-90)"
                  fill="#4b3757"
                />
                <g clipPath="url(#clipPath-96)">
                  <path
                    d="M512.19,551.61s5.9-2,3.36,11.6,5.27,0,5.27,0l-1.26-15.39-8.51-.57Z"
                    fill="#7370bd"
                    opacity="0.2"
                    style={{ mixBlendMode: "multiply" }}
                  />
                </g>
                <rect
                  x="508.68"
                  y="554.22"
                  width="13.88"
                  height="3.88"
                  transform="translate(-40.54 1071.77) rotate(-90)"
                  fill="#4b3757"
                />
                <g clipPath="url(#clipPath-97)">
                  <path
                    d="M512.26,551.5s5.9-2,3.36,11.6,5.27,0,5.27,0l-1.26-15.39-8.51-.57Z"
                    fill="#7370bd"
                    opacity="0.2"
                    style={{ mixBlendMode: "multiply" }}
                  />
                </g>
                <rect
                  x="500.68"
                  y="545.07"
                  width="33.76"
                  height="4.15"
                  transform="translate(1035.11 1094.28) rotate(180)"
                  fill="#ffe8cf"
                />
                <g clipPath="url(#clipPath-98)">
                  <path
                    d="M527.58,542.27s1.79,7.75-30.31,6.94v3.11h39.59v-8.79Z"
                    fill="#7370bd"
                    opacity="0.2"
                    style={{ mixBlendMode: "multiply" }}
                  />
                </g>
                <rect
                  x="525.56"
                  y="540.34"
                  width="13.88"
                  height="3.88"
                  transform="translate(-9.78 1074.77) rotate(-90)"
                  fill="#4b3757"
                />
                <g clipPath="url(#clipPath-99)">
                  <path
                    d="M529.14,537.62s5.9-2,3.36,11.59,5.27,0,5.27,0l-1.26-15.38-8.51-.57Z"
                    fill="#7370bd"
                    opacity="0.2"
                    style={{ mixBlendMode: "multiply" }}
                  />
                </g>
                <rect
                  x="525.63"
                  y="540.23"
                  width="13.88"
                  height="3.88"
                  transform="translate(-9.6 1074.73) rotate(-90)"
                  fill="#4b3757"
                />
                <g clipPath="url(#clipPath-100)">
                  <path
                    d="M529.21,537.51s5.9-2,3.36,11.59,5.27,0,5.27,0l-1.26-15.38-8.52-.57Z"
                    fill="#7370bd"
                    opacity="0.2"
                    style={{ mixBlendMode: "multiply" }}
                  />
                </g>
                <rect
                  x="517.63"
                  y="531.08"
                  width="33.76"
                  height="4.15"
                  transform="translate(1069.01 1066.3) rotate(180)"
                  fill="#ffe8cf"
                />
                <g clipPath="url(#clipPath-101)">
                  <path
                    d="M544.52,528.28s1.8,7.75-30.31,6.94v3.11h39.6v-8.79Z"
                    fill="#7370bd"
                    opacity="0.2"
                    style={{ mixBlendMode: "multiply" }}
                  />
                </g>
                <rect
                  x="542.5"
                  y="526.34"
                  width="13.88"
                  height="3.88"
                  transform="translate(21.16 1077.73) rotate(-90)"
                  fill="#4b3757"
                />
                <g clipPath="url(#clipPath-102)">
                  <path
                    d="M546.08,523.63s5.91-2,3.36,11.59,5.28,0,5.28,0l-1.26-15.38-8.52-.57Z"
                    fill="#7370bd"
                    opacity="0.2"
                    style={{ mixBlendMode: "multiply" }}
                  />
                </g>
                <path
                  d="M375.49,673.39S389,591.6,480.06,553.45c69-28.91,128.83-19.26,128.83-19.26V516.66H373.1Z"
                  fill="#b55243"
                  opacity="0.2"
                  style={{ mixBlendMode: "multiply" }}
                />
                <circle cx="557.34" cy="583.43" r="29.24" fill="#d3d2ff" />
                <g clipPath="url(#clipPath-103)">
                  <rect
                    x="532.15"
                    y="536.98"
                    width="6.77"
                    height="76.43"
                    transform="translate(563.6 -210.21) rotate(45)"
                    fill="#fff"
                    opacity="0.5"
                  />
                  <rect
                    x="578.64"
                    y="552.23"
                    width="6.77"
                    height="76.43"
                    transform="translate(588 -238.62) rotate(45)"
                    fill="#fff"
                    opacity="0.5"
                  />
                  <rect
                    x="540.01"
                    y="543.27"
                    width="4.76"
                    height="76.43"
                    transform="translate(570.03 -213.21) rotate(45)"
                    fill="#fff"
                    opacity="0.5"
                  />
                  <rect
                    x="557.64"
                    y="552.23"
                    width="2.38"
                    height="76.43"
                    transform="translate(581.19 -222.21) rotate(45)"
                    fill="#fff"
                    opacity="0.5"
                  />
                  <rect
                    x="591.5"
                    y="555"
                    width="2.38"
                    height="76.43"
                    transform="translate(593.06 -245.34) rotate(45)"
                    fill="#fff"
                    opacity="0.5"
                  />
                </g>
                <path
                  d="M557.34,613.67a30.24,30.24,0,1,1,30.24-30.24A30.27,30.27,0,0,1,557.34,613.67Zm0-58.48a28.24,28.24,0,1,0,28.24,28.24A28.27,28.27,0,0,0,557.34,555.19Z"
                  fill="#4b3757"
                />
                <path
                  d="M520.16,629.57h-35c-6,27.2,17.53,25.26,17.53,25.26S526.14,656.77,520.16,629.57Z"
                  fill="#d3d2ff"
                />
                <g clipPath="url(#clipPath-104)">
                  <g opacity="0.3">
                    <path
                      d="M470.23,640.28s13.21-3.34,36.26-23.13"
                      fill="none"
                      stroke="#4b3757"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M475.19,644.21s13.21-3.34,36.26-23.13"
                      fill="none"
                      stroke="#4b3757"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M480.16,648.15s13.2-3.34,36.26-23.13"
                      fill="none"
                      stroke="#4b3757"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M485.12,652.09s13.2-3.34,36.26-23.14"
                      fill="none"
                      stroke="#4b3757"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M490.08,656s13.2-3.34,36.26-23.13"
                      fill="none"
                      stroke="#4b3757"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M495,660s13.21-3.34,36.26-23.13"
                      fill="none"
                      stroke="#4b3757"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                  <path
                    d="M499.81,630.73s-5.53,3.59-3.15,14.62,24.44,4.77,23.6,2.82-.86,13.17-23.6,9.65-12.52-29.59-12.52-29.59l15.67,2.5"
                    fill="#7370bd"
                    opacity="0.3"
                    style={{ mixBlendMode: "multiply" }}
                  />
                </g>
                <path
                  d="M520.16,629.57c0-2-7.85-3.58-17.52-3.58s-17.53,1.6-17.53,3.58,7.85,3.58,17.53,3.58S520.16,631.55,520.16,629.57Z"
                  fill="#4b3757"
                />
                <g clipPath="url(#clipPath-105)">
                  <path
                    d="M504.64,624s-12.89,11.22,14.46,6.81-19,9.44-19,9.44-19.35-3.7-19.48-10.65S504.64,624,504.64,624Z"
                    fill="#7370bd"
                    opacity="0.3"
                    style={{ mixBlendMode: "multiply" }}
                  />
                </g>
                <path
                  d="M518.7,620.54l7.89-22.64-13.48,20.44,4.32-33.17-11.55,30-7.52-38.73V624.2l-11.9-29.6,5.6,30.4-16.61-21.2,11,23.69c0,1.82,7.22,3.29,16.12,3.29s16.12-1.47,16.12-3.29l9.82-12.61Z"
                  fill="#b55243"
                />
                <g clipPath="url(#clipPath-106)">
                  <path
                    d="M504.68,585.11s-8,29.41-2,38.62,19.67,2.48,19.67,2.48.38,8.58-24.26,6.94-26.7-27.54-26.7-27.54l1.54-19.41,31.27-18.27Z"
                    fill="#7370bd"
                    opacity="0.3"
                    style={{ mixBlendMode: "multiply" }}
                  />
                </g>
                <polygon
                  points="413.22 528.12 362.66 628.7 489.42 628.7 438.87 528.12 413.22 528.12"
                  fill="url(#Degradado_sin_nombre_3-5)"
                  style={{ mixBlendMode: "overlay" }}
                />
                <polygon
                  points="537.03 528.12 486.48 628.7 613.24 628.7 562.69 528.12 537.03 528.12"
                  fill="url(#Degradado_sin_nombre_3-6)"
                  style={{ mixBlendMode: "overlay" }}
                />
                <rect
                  id="F1_Stairs_Dark"
                  style={{ display: this.state.rooms.find((r) => r.Name === "F1_Stairs").displayStyle }}
                  data-name="F1_Stairs_Dark"
                  x="379.06"
                  y="525.79"
                  width="215.89"
                  height="132"
                  opacity="0.9"
                />
              </g>
              <rect x="256.04" y="657.92" width="160" height="132" fill="#ff8d7b" />
              <g clipPath="url(#clipPath-107)">
                <rect x="329.98" y="669.39" width="17.17" height="25.47" rx="2.69" fill="#ffea97" />
                <g clipPath="url(#clipPath-108)">
                  <path
                    d="M339.91,668.09A15.66,15.66,0,0,0,335.33,679c0,6.75.57,12.41,14.5,12.41v6.32H326.55V668.52Z"
                    fill="#b55243"
                    opacity="0.2"
                    style={{ mixBlendMode: "multiply" }}
                  />
                </g>
                <rect
                  x="349.1"
                  y="673.82"
                  width="17.75"
                  height="23.08"
                  rx="2.69"
                  transform="translate(-327.38 1043.34) rotate(-90)"
                  fill="#4b3757"
                />
                <g clipPath="url(#clipPath-109)">
                  <path
                    d="M345.25,684a13.59,13.59,0,0,0,9.87,4.73c6.11,0,11.24-.59,11.24-15h5.72v24.07H345.65Z"
                    fill="#7370bd"
                    opacity="0.3"
                    style={{ mixBlendMode: "multiply" }}
                  />
                </g>
                <path
                  d="M312.31,680.27v-9.81H287.57v9.81h-3.42V694.4L315.06,696V680.27Zm-22.74-7.81h20.74v7.81H289.57Z"
                  fill="#ffea97"
                />
                <g clipPath="url(#clipPath-110)">
                  <path
                    d="M302.94,667.06s-9.16,7.28-9.16,17.55,30.32,7.1,30.32,7.1v6.45h-42v-31.1Z"
                    fill="#b55243"
                    opacity="0.2"
                    style={{ mixBlendMode: "multiply" }}
                  />
                </g>
                <path
                  d="M389.89,683.63v-7.71H370.43v7.71h-2.69v11.12L392.06,696V683.63ZM372,677.49h16.32v6.14H372Z"
                  fill="#7370bd"
                />
                <g clipPath="url(#clipPath-111)">
                  <path
                    d="M382.52,673.25s-7.2,5.72-7.2,13.8,23.84,5.59,23.84,5.59v5.07h-33V673.25Z"
                    fill="#b55243"
                    opacity="0.2"
                    style={{ mixBlendMode: "multiply" }}
                  />
                </g>
                <rect x="279.94" y="693.29" width="114.11" height="3.79" fill="#4b3757" />
                <g clipPath="url(#clipPath-112)">
                  <path
                    d="M309.73,689.35s-10.53,7.2,87.58,7.2v6.11H276.25V689.35Z"
                    fill="#7370bd"
                    opacity="0.2"
                    style={{ mixBlendMode: "multiply" }}
                  />
                </g>
                <path
                  d="M252.3,805.71s9.8-82.49,75.82-121c50-29.16,93.4-19.42,93.4-19.42V647.65H250.57Z"
                  fill="#b55243"
                  opacity="0.2"
                  style={{ mixBlendMode: "multiply" }}
                />
                <rect x="368.89" y="743.92" width="13.26" height="6.21" rx="1.15" fill="#4b3757" />
                <g clipPath="url(#clipPath-113)">
                  <path
                    d="M372.41,742.58s-.24,4.5,1.66,5,8.94,0,8.94,0v4.74H367.6v-8.76Z"
                    fill="#7370bd"
                    opacity="0.3"
                    style={{ mixBlendMode: "multiply" }}
                  />
                </g>
                <rect x="294.99" y="743.92" width="13.26" height="6.21" rx="1.15" fill="#4b3757" />
                <g clipPath="url(#clipPath-114)">
                  <path
                    d="M304.42,742.58s.25,4.5-1.73,5-9.32,0-9.32,0v4.74h16.07v-8.76Z"
                    fill="#7370bd"
                    opacity="0.3"
                    style={{ mixBlendMode: "multiply" }}
                  />
                </g>
                <path
                  d="M292.91,786.55h0a3.47,3.47,0,0,1-3.47-3.47V772.27a3.47,3.47,0,0,1,3.47-3.47h0a3.48,3.48,0,0,1,3.48,3.47v10.81A3.47,3.47,0,0,1,292.91,786.55Z"
                  fill="#4b3757"
                />
                <g clipPath="url(#clipPath-115)">
                  <path
                    d="M297.34,776.58s-5-.49-5,4.61v8.1h-5.64V766.86h11.75Z"
                    fill="#7370bd"
                    opacity="0.3"
                    style={{ mixBlendMode: "multiply" }}
                  />
                </g>
                <path
                  d="M384.23,786.55h0a3.47,3.47,0,0,1-3.48-3.47V772.27a3.48,3.48,0,0,1,3.48-3.47h0a3.47,3.47,0,0,1,3.47,3.47v10.81A3.47,3.47,0,0,1,384.23,786.55Z"
                  fill="#4b3757"
                />
                <g clipPath="url(#clipPath-116)">
                  <path
                    d="M388.65,776.58s-4.95-.49-4.95,4.61v8.1h-5.65V766.86h11.76Z"
                    fill="#7370bd"
                    opacity="0.3"
                    style={{ mixBlendMode: "multiply" }}
                  />
                </g>
                <polygon
                  points="383.73 748.6 371.93 748.6 358.07 723.5 338.57 723.5 319.07 723.5 305.21 748.6 293.41 748.6 283.66 773.7 338.57 773.7 393.48 773.7 383.73 748.6"
                  fill="#7370bd"
                />
                <g clipPath="url(#clipPath-117)">
                  <path
                    d="M345.74,717.15s-24.78,2.94-27.8,24.22,31.09,26.19,73.9,26.19l3.62,10.78H274.81L283,743.17l30.22-24.39Z"
                    fill="#7370bd"
                    opacity="0.3"
                    style={{ mixBlendMode: "multiply" }}
                  />
                  <rect x="309.1" y="752.24" width="58.95" height="12.84" rx="1.58" fill="#4b3757" />
                  <g clipPath="url(#clipPath-118)">
                    <rect
                      x="306.87"
                      y="753.8"
                      width="64.04"
                      height="1.3"
                      fill="#7370bd"
                      opacity="0.3"
                      style={{ mixBlendMode: "multiply" }}
                    />
                    <rect
                      x="306.87"
                      y="756.6"
                      width="64.04"
                      height="1.3"
                      fill="#7370bd"
                      opacity="0.3"
                      style={{ mixBlendMode: "multiply" }}
                    />
                    <rect
                      x="306.87"
                      y="759.41"
                      width="64.04"
                      height="1.3"
                      fill="#7370bd"
                      opacity="0.3"
                      style={{ mixBlendMode: "multiply" }}
                    />
                    <rect
                      x="306.87"
                      y="762.22"
                      width="64.04"
                      height="1.3"
                      fill="#7370bd"
                      opacity="0.3"
                      style={{ mixBlendMode: "multiply" }}
                    />
                    <path
                      d="M319.67,751.17s-6.36,3.37-4.57,7.07c2.84,5.89,54.42,2.94,54.42,2.94v5.37H307.41v-15Z"
                      fill="#7370bd"
                      opacity="0.3"
                      style={{ mixBlendMode: "multiply" }}
                    />
                  </g>
                </g>
                <polygon points="308.25 748.6 369.52 748.6 356.68 725.92 320.68 725.92 308.25 748.6" fill="#fff" />
                <g clipPath="url(#clipPath-119)">
                  <line
                    x1="312.25"
                    y1="749.39"
                    x2="334.99"
                    y2="741.4"
                    fill="none"
                    stroke="#4b3757"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="0.5"
                  />
                  <line
                    x1="339.8"
                    y1="749.39"
                    x2="362.54"
                    y2="741.4"
                    fill="none"
                    stroke="#4b3757"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="0.5"
                  />
                  <path
                    d="M357.38,727.16s-30.17-.44-34.86,7.45,14.82,14,49.41,14L336,755.13H304L320.15,722l37.92,1.53,2.82,3-3.51.61"
                    fill="#7370bd"
                    opacity="0.3"
                    style={{ mixBlendMode: "multiply" }}
                  />
                </g>
                <path d="M305.48,759.38a5.69,5.69,0,1,0-5.69,5.7A5.69,5.69,0,0,0,305.48,759.38Z" fill="#fff" />
                <g clipPath="url(#clipPath-120)">
                  <path
                    d="M301.68,752.92s-7,1.27-4.11,7.9c2.49,5.77,10.58-.48,10.58-.48s.47,6.32-9.79,6.32S290.46,751.34,301.68,752.92Z"
                    fill="#7370bd"
                    opacity="0.3"
                    style={{ mixBlendMode: "multiply" }}
                  />
                </g>
                <circle cx="377.32" cy="759.38" r="5.69" fill="#fff" />
                <g clipPath="url(#clipPath-121)">
                  <path
                    d="M379.2,752.92s-7,1.27-4.1,7.9c2.49,5.77,10.57-.48,10.57-.48s.48,6.32-9.78,6.32S368,751.34,379.2,752.92Z"
                    fill="#7370bd"
                    opacity="0.3"
                    style={{ mixBlendMode: "multiply" }}
                  />
                </g>
                <path
                  d="M338.57,768.8H284.5a2.81,2.81,0,0,0-2.82,2.81h0a2.82,2.82,0,0,0,2.82,2.82H392.64a2.82,2.82,0,0,0,2.82-2.82h0a2.81,2.81,0,0,0-2.82-2.81Z"
                  fill="#d3d2ff"
                />
                <rect x="323.56" y="770.63" width="30.02" height="11.26" fill="#ffe8cf" />
                <polygon
                  points="325.74 659.42 275.19 760 401.95 760 351.4 659.42 325.74 659.42"
                  fill="url(#Degradado_sin_nombre_3-7)"
                  style={{ mixBlendMode: "overlay" }}
                />
                <rect
                  id="Garage_Dark"
                  style={{ display: this.state.rooms.find((r) => r.Name === "Garage").displayStyle }}
                  x="255.04"
                  y="657.92"
                  width="161"
                  height="132"
                  opacity="0.9"
                />
              </g>
              <rect x="256.04" y="789.92" width="338.53" height="126" fill="#895da8" />
              <g clipPath="url(#clipPath-122)">
                <rect
                  x="282.85"
                  y="917.04"
                  width="13.88"
                  height="3.89"
                  transform="translate(-629.19 1208.77) rotate(-90)"
                  fill="#4b3757"
                />
                <g clipPath="url(#clipPath-123)">
                  <path
                    d="M286.42,914.33s5.92-2,3.37,11.59,5.29,0,5.29,0l-1.27-15.38-8.53-.57Z"
                    fill="#7370bd"
                    opacity="0.2"
                    style={{ mixBlendMode: "multiply" }}
                  />
                </g>
                <rect
                  x="274.81"
                  y="907.89"
                  width="33.85"
                  height="4.15"
                  transform="translate(583.47 1819.93) rotate(180)"
                  fill="#ffe8cf"
                />
                <g clipPath="url(#clipPath-124)">
                  <path
                    d="M301.78,905.1s1.8,7.74-30.39,6.94v3.1H311.1v-8.78Z"
                    fill="#7370bd"
                    opacity="0.2"
                    style={{ mixBlendMode: "multiply" }}
                  />
                </g>
                <rect
                  x="299.78"
                  y="903.15"
                  width="13.88"
                  height="3.89"
                  transform="translate(-598.38 1211.81) rotate(-90)"
                  fill="#4b3757"
                />
                <g clipPath="url(#clipPath-125)">
                  <path
                    d="M303.35,900.45s5.92-2,3.37,11.59,5.29,0,5.29,0l-1.27-15.38-8.54-.58Z"
                    fill="#7370bd"
                    opacity="0.2"
                    style={{ mixBlendMode: "multiply" }}
                  />
                </g>
                <rect
                  x="299.85"
                  y="903.04"
                  width="13.88"
                  height="3.89"
                  transform="translate(-598.2 1211.77) rotate(-90)"
                  fill="#4b3757"
                />
                <g clipPath="url(#clipPath-126)">
                  <path
                    d="M303.42,900.34s5.92-2,3.37,11.59,5.29,0,5.29,0l-1.27-15.38-8.54-.58Z"
                    fill="#7370bd"
                    opacity="0.2"
                    style={{ mixBlendMode: "multiply" }}
                  />
                </g>
                <rect
                  x="291.8"
                  y="893.9"
                  width="33.85"
                  height="4.15"
                  transform="translate(617.46 1791.95) rotate(180)"
                  fill="#ffe8cf"
                />
                <g clipPath="url(#clipPath-127)">
                  <path
                    d="M318.78,891.11s1.79,7.74-30.4,6.94v3.1h39.71v-8.79Z"
                    fill="#7370bd"
                    opacity="0.2"
                    style={{ mixBlendMode: "multiply" }}
                  />
                </g>
                <rect
                  x="316.77"
                  y="889.16"
                  width="13.88"
                  height="3.89"
                  transform="translate(-567.39 1214.82) rotate(-90)"
                  fill="#4b3757"
                />
                <g clipPath="url(#clipPath-128)">
                  <path
                    d="M320.34,886.45s5.92-2,3.37,11.6,5.29,0,5.29,0l-1.27-15.38-8.53-.58Z"
                    fill="#7370bd"
                    opacity="0.2"
                    style={{ mixBlendMode: "multiply" }}
                  />
                </g>
                <rect
                  x="316.84"
                  y="889.05"
                  width="13.88"
                  height="3.89"
                  transform="translate(-567.22 1214.78) rotate(-90)"
                  fill="#4b3757"
                />
                <g clipPath="url(#clipPath-129)">
                  <path
                    d="M320.41,886.35s5.92-2,3.37,11.59,5.29,0,5.29,0l-1.27-15.38-8.53-.58Z"
                    fill="#7370bd"
                    opacity="0.2"
                    style={{ mixBlendMode: "multiply" }}
                  />
                </g>
                <rect
                  x="308.8"
                  y="879.91"
                  width="33.85"
                  height="4.15"
                  transform="translate(651.45 1763.97) rotate(180)"
                  fill="#ffe8cf"
                />
                <g clipPath="url(#clipPath-130)">
                  <path
                    d="M335.77,877.12s1.8,7.74-30.39,6.94v3.1h39.71v-8.79Z"
                    fill="#7370bd"
                    opacity="0.2"
                    style={{ mixBlendMode: "multiply" }}
                  />
                </g>
                <rect
                  x="333.77"
                  y="875.17"
                  width="13.88"
                  height="3.89"
                  transform="translate(-536.41 1217.82) rotate(-90)"
                  fill="#4b3757"
                />
                <g clipPath="url(#clipPath-131)">
                  <path
                    d="M337.34,872.46s5.92-2,3.37,11.6,5.29,0,5.29,0l-1.27-15.39-8.54-.57Z"
                    fill="#7370bd"
                    opacity="0.2"
                    style={{ mixBlendMode: "multiply" }}
                  />
                </g>
                <rect
                  x="333.84"
                  y="875.06"
                  width="13.88"
                  height="3.89"
                  transform="translate(-536.23 1217.78) rotate(-90)"
                  fill="#4b3757"
                />
                <g clipPath="url(#clipPath-132)">
                  <path
                    d="M337.41,872.35s5.92-2,3.37,11.6,5.29,0,5.29,0l-1.27-15.38-8.54-.58Z"
                    fill="#7370bd"
                    opacity="0.2"
                    style={{ mixBlendMode: "multiply" }}
                  />
                </g>
                <rect
                  x="325.8"
                  y="865.92"
                  width="33.85"
                  height="4.15"
                  transform="translate(685.44 1735.98) rotate(180)"
                  fill="#ffe8cf"
                />
                <g clipPath="url(#clipPath-133)">
                  <path
                    d="M352.77,863.12s1.8,7.75-30.4,6.94v3.11h39.71v-8.79Z"
                    fill="#7370bd"
                    opacity="0.2"
                    style={{ mixBlendMode: "multiply" }}
                  />
                </g>
                <rect
                  x="350.76"
                  y="861.18"
                  width="13.88"
                  height="3.89"
                  transform="translate(-505.42 1220.83) rotate(-90)"
                  fill="#4b3757"
                />
                <g clipPath="url(#clipPath-134)">
                  <path
                    d="M354.33,858.47s5.93-2,3.37,11.59,5.29,0,5.29,0l-1.26-15.38-8.54-.57Z"
                    fill="#7370bd"
                    opacity="0.2"
                    style={{ mixBlendMode: "multiply" }}
                  />
                </g>
                <rect
                  x="350.83"
                  y="861.07"
                  width="13.88"
                  height="3.89"
                  transform="translate(-505.24 1220.79) rotate(-90)"
                  fill="#4b3757"
                />
                <g clipPath="url(#clipPath-135)">
                  <path
                    d="M354.4,858.36s5.93-2,3.37,11.6,5.29,0,5.29,0l-1.26-15.39-8.54-.57Z"
                    fill="#7370bd"
                    opacity="0.2"
                    style={{ mixBlendMode: "multiply" }}
                  />
                </g>
                <rect
                  x="342.79"
                  y="851.93"
                  width="33.85"
                  height="4.15"
                  transform="translate(719.43 1708) rotate(180)"
                  fill="#ffe8cf"
                />
                <g clipPath="url(#clipPath-136)">
                  <path
                    d="M369.76,849.13s1.8,7.75-30.39,6.94v3.11h39.71v-8.79Z"
                    fill="#7370bd"
                    opacity="0.2"
                    style={{ mixBlendMode: "multiply" }}
                  />
                </g>
                <rect
                  x="367.76"
                  y="847.19"
                  width="13.88"
                  height="3.89"
                  transform="translate(-474.43 1223.83) rotate(-90)"
                  fill="#4b3757"
                />
                <g clipPath="url(#clipPath-137)">
                  <path
                    d="M371.33,844.48s5.92-2,3.37,11.59,5.29,0,5.29,0l-1.27-15.38-8.54-.57Z"
                    fill="#7370bd"
                    opacity="0.2"
                    style={{ mixBlendMode: "multiply" }}
                  />
                </g>
                <rect
                  x="367.83"
                  y="847.08"
                  width="13.88"
                  height="3.89"
                  transform="translate(-474.25 1223.79) rotate(-90)"
                  fill="#4b3757"
                />
                <g clipPath="url(#clipPath-138)">
                  <path
                    d="M371.4,844.37s5.92-2,3.37,11.59,5.29,0,5.29,0l-1.27-15.38-8.54-.57Z"
                    fill="#7370bd"
                    opacity="0.2"
                    style={{ mixBlendMode: "multiply" }}
                  />
                </g>
                <rect
                  x="359.79"
                  y="837.94"
                  width="33.85"
                  height="4.15"
                  transform="translate(753.43 1680.02) rotate(180)"
                  fill="#ffe8cf"
                />
                <g clipPath="url(#clipPath-139)">
                  <path
                    d="M386.76,835.14s1.8,7.74-30.4,6.94v3.1h39.72V836.4Z"
                    fill="#7370bd"
                    opacity="0.2"
                    style={{ mixBlendMode: "multiply" }}
                  />
                </g>
                <rect
                  x="384.75"
                  y="833.2"
                  width="13.88"
                  height="3.89"
                  transform="translate(-443.45 1226.84) rotate(-90)"
                  fill="#4b3757"
                />
                <g clipPath="url(#clipPath-140)">
                  <path
                    d="M388.32,830.49s5.93-2,3.37,11.59,5.3,0,5.3,0l-1.27-15.38-8.54-.57Z"
                    fill="#7370bd"
                    opacity="0.2"
                    style={{ mixBlendMode: "multiply" }}
                  />
                </g>
                <rect
                  x="384.82"
                  y="833.09"
                  width="13.88"
                  height="3.89"
                  transform="translate(-443.27 1226.8) rotate(-90)"
                  fill="#4b3757"
                />
                <g clipPath="url(#clipPath-141)">
                  <path
                    d="M388.39,830.38s5.93-2,3.37,11.59,5.3,0,5.3,0l-1.27-15.38-8.54-.57Z"
                    fill="#7370bd"
                    opacity="0.2"
                    style={{ mixBlendMode: "multiply" }}
                  />
                </g>
                <rect
                  x="376.78"
                  y="823.94"
                  width="33.85"
                  height="4.15"
                  transform="translate(787.42 1652.04) rotate(180)"
                  fill="#ffe8cf"
                />
                <g clipPath="url(#clipPath-142)">
                  <path
                    d="M403.76,821.15s1.79,7.74-30.4,6.94v3.1h39.71v-8.78Z"
                    fill="#7370bd"
                    opacity="0.2"
                    style={{ mixBlendMode: "multiply" }}
                  />
                </g>
                <rect
                  x="401.75"
                  y="819.21"
                  width="13.88"
                  height="3.89"
                  transform="translate(-412.46 1229.84) rotate(-90)"
                  fill="#4b3757"
                />
                <g clipPath="url(#clipPath-143)">
                  <path
                    d="M405.32,816.5s5.92-2,3.37,11.59,5.29,0,5.29,0l-1.27-15.38-8.53-.57Z"
                    fill="#7370bd"
                    opacity="0.2"
                    style={{ mixBlendMode: "multiply" }}
                  />
                </g>
                <rect
                  x="401.82"
                  y="819.1"
                  width="13.88"
                  height="3.89"
                  transform="translate(-412.28 1229.8) rotate(-90)"
                  fill="#4b3757"
                />
                <g clipPath="url(#clipPath-144)">
                  <path
                    d="M405.39,816.39s5.92-2,3.37,11.59,5.29,0,5.29,0l-1.27-15.38-8.53-.57Z"
                    fill="#7370bd"
                    opacity="0.2"
                    style={{ mixBlendMode: "multiply" }}
                  />
                </g>
                <rect
                  x="393.78"
                  y="809.95"
                  width="33.85"
                  height="4.15"
                  transform="translate(821.41 1624.05) rotate(180)"
                  fill="#ffe8cf"
                />
                <g clipPath="url(#clipPath-145)">
                  <path
                    d="M420.75,807.16s1.8,7.74-30.39,6.94v3.1h39.71v-8.78Z"
                    fill="#7370bd"
                    opacity="0.2"
                    style={{ mixBlendMode: "multiply" }}
                  />
                </g>
                <rect
                  x="418.75"
                  y="805.21"
                  width="13.88"
                  height="3.89"
                  transform="translate(-381.47 1232.85) rotate(-90)"
                  fill="#4b3757"
                />
                <g clipPath="url(#clipPath-146)">
                  <path
                    d="M422.32,802.51s5.92-2,3.37,11.59,5.29,0,5.29,0l-1.27-15.38-8.54-.58Z"
                    fill="#7370bd"
                    opacity="0.2"
                    style={{ mixBlendMode: "multiply" }}
                  />
                </g>
                <rect
                  x="418.82"
                  y="805.11"
                  width="13.88"
                  height="3.89"
                  transform="translate(-381.29 1232.81) rotate(-90)"
                  fill="#4b3757"
                />
                <g clipPath="url(#clipPath-147)">
                  <path
                    d="M422.39,802.4s5.92-2,3.37,11.59,5.29,0,5.29,0l-1.27-15.38-8.54-.57Z"
                    fill="#7370bd"
                    opacity="0.2"
                    style={{ mixBlendMode: "multiply" }}
                  />
                </g>
                <rect
                  x="410.77"
                  y="795.96"
                  width="33.85"
                  height="4.15"
                  transform="translate(855.4 1596.07) rotate(180)"
                  fill="#ffe8cf"
                />
                <g clipPath="url(#clipPath-148)">
                  <path
                    d="M437.75,793.17s1.8,7.74-30.4,6.94v3.1h39.71v-8.78Z"
                    fill="#7370bd"
                    opacity="0.2"
                    style={{ mixBlendMode: "multiply" }}
                  />
                </g>
                <rect
                  x="435.74"
                  y="791.22"
                  width="13.88"
                  height="3.89"
                  transform="translate(-350.49 1235.85) rotate(-90)"
                  fill="#4b3757"
                />
                <g clipPath="url(#clipPath-149)">
                  <path
                    d="M439.31,788.52s5.93-2,3.37,11.59,5.29,0,5.29,0l-1.26-15.38-8.54-.58Z"
                    fill="#7370bd"
                    opacity="0.2"
                    style={{ mixBlendMode: "multiply" }}
                  />
                </g>
                <path
                  d="M245.86,934.71s21-78.51,162.46-115.12c107.21-27.76,200.14-18.49,200.14-18.49V784.27H242.15Z"
                  fill="#7370bd"
                  opacity="0.2"
                  style={{ mixBlendMode: "multiply" }}
                />
                <rect x="291.41" y="787.71" width="4.84" height="33.47" fill="#4b3757" />
                <g clipPath="url(#clipPath-150)">
                  <path
                    d="M293.83,786.92s-2.89,26.84,4.37,27v9.79h-7.42l-2-12.32V784.55Z"
                    fill="#7370bd"
                    opacity="0.2"
                    style={{ mixBlendMode: "multiply" }}
                  />
                </g>
                <rect x="274.35" y="815.37" width="39.38" height="54.23" fill="#fff" />
                <g clipPath="url(#clipPath-151)">
                  <rect x="283.09" y="857.18" width="21.91" height="1.37" fill="#4b3757" />
                  <rect x="283.09" y="859.4" width="21.91" height="1.37" fill="#4b3757" />
                  <rect x="283.09" y="861.61" width="21.91" height="1.37" fill="#4b3757" />
                  <path
                    d="M279.41,812.55s-6.73,57.27,38.11,53.48v5.26H275.19l-4.41-1.69V811.29Z"
                    fill="#7370bd"
                    opacity="0.2"
                    style={{ mixBlendMode: "multiply" }}
                  />
                  <path
                    d="M298.14,823.53c-1.18,2.13-2.46,4.18-3.69,6.28L290.57,836l-.9-1.16c2.53-1,5.08-1.95,7.63-2.92l2.83-1.07-1.72,2.53q-3.33,4.89-6.78,9.73l-1.08-1.47c2.45-.74,4.89-1.5,7.35-2.2l2.1-.59-1.18,1.76-4.15,6.25c-1.45,2-2.84,4.12-4.35,6.13,1.11-2.26,2.32-4.44,3.48-6.66l3.66-6.55.93,1.17c-2.41.88-4.83,1.69-7.25,2.52l-2.71.93,1.63-2.39q3.33-4.9,6.77-9.73l1.11,1.45c-2.58.87-5.14,1.76-7.75,2.57l-2.29.7,1.39-1.87,4.34-5.84C295.14,827.34,296.59,825.4,298.14,823.53Z"
                    fill="#ffea97"
                  />
                </g>
                <rect x="443.7" y="877.08" width="89.96" height="3.71" fill="#4b3757" />
                <g clipPath="url(#clipPath-152)">
                  <path
                    d="M455.21,872.91s-1.94,8,80.22,7l1.53,1.54H441.61v-9.69Z"
                    fill="#4b3757"
                    opacity="0.2"
                    style={{ mixBlendMode: "multiply" }}
                  />
                </g>
                <rect x="449.64" y="880.79" width="78.08" height="11.4" fill="#4b3757" />
                <g clipPath="url(#clipPath-153)">
                  <path
                    d="M464.33,878.93s-2.32,13.26,67.24,13.26-7.42,9.46-7.42,9.46H443.7V877.08Z"
                    fill="#4b3757"
                    opacity="0.2"
                    style={{ mixBlendMode: "multiply" }}
                  />
                </g>
                <rect x="445.78" y="880.79" width="3.85" height="32.92" fill="#4b3757" />
                <g clipPath="url(#clipPath-154)">
                  <path
                    d="M451,883.11s-3.1,0-3.33,4.87-1.31,28-1.31,28h-2.7V880h8.88Z"
                    fill="#4b3757"
                    opacity="0.2"
                    style={{ mixBlendMode: "multiply" }}
                  />
                </g>
                <rect x="480.1" y="884.96" width="17.16" height="3.01" fill="#fff" />
                <rect x="527.71" y="880.79" width="3.85" height="32.92" fill="#4b3757" />
                <g clipPath="url(#clipPath-155)">
                  <path
                    d="M533,883.11s-3.1,0-3.33,4.87-1.31,28-1.31,28h-2.7V880h8.89Z"
                    fill="#4b3757"
                    opacity="0.2"
                    style={{ mixBlendMode: "multiply" }}
                  />
                </g>
                <path
                  d="M580.76,852.17H534.09a2.57,2.57,0,0,1-2.52-3.08l1.79-8.8a2.56,2.56,0,0,1,2.51-2H579a2.57,2.57,0,0,1,2.52,2l1.78,8.8A2.57,2.57,0,0,1,580.76,852.17Z"
                  fill="#fff"
                />
                <g clipPath="url(#clipPath-156)">
                  <path d="M543.86,842.76a3.3,3.3,0,1,0-3.29,3.3A3.29,3.29,0,0,0,543.86,842.76Z" fill="#4b3757" />
                  <path d="M543.55,842.76a3,3,0,1,0-3,3A3,3,0,0,0,543.55,842.76Z" fill="#d3d2ff" />
                  <rect x="539.97" y="840.32" width="1.2" height="4.9" rx="0.27" fill="#4b3757" />
                  <path d="M560.72,842.76a3.3,3.3,0,1,0-3.3,3.3A3.29,3.29,0,0,0,560.72,842.76Z" fill="#4b3757" />
                  <path d="M560.41,842.76a3,3,0,1,0-3,3A3,3,0,0,0,560.41,842.76Z" fill="#d3d2ff" />
                  <rect x="556.82" y="840.32" width="1.2" height="4.9" rx="0.27" fill="#4b3757" />
                  <path d="M577.57,842.76a3.3,3.3,0,1,0-3.29,3.3A3.29,3.29,0,0,0,577.57,842.76Z" fill="#4b3757" />
                  <path d="M577.26,842.76a3,3,0,1,0-3,3A3,3,0,0,0,577.26,842.76Z" fill="#d3d2ff" />
                  <rect x="573.67" y="840.32" width="1.2" height="4.9" rx="0.27" fill="#4b3757" />
                  <path
                    d="M542,836.67a5.47,5.47,0,0,0-1.3,6.92c2.51,5,45.69,2.62,45.69,2.62V848H531.52V836.67Z"
                    fill="#7370bd"
                    opacity="0.2"
                    style={{ mixBlendMode: "multiply" }}
                  />
                </g>
                <rect x="531.18" y="846.85" width="52.71" height="66.12" fill="#fff" />
                <g clipPath="url(#clipPath-157)">
                  <rect x="529.84" y="845.23" width="55.72" height="4.16" fill="#4b3757" />
                  <circle
                    cx="557.54"
                    cy="879.91"
                    r="20.35"
                    transform="translate(-458.89 651.96) rotate(-45)"
                    fill="#4b3757"
                  />
                  <circle cx="557.54" cy="879.91" r="17.17" fill="#d3d2ff" />
                  <g clipPath="url(#clipPath-158)">
                    <path
                      d="M559,861.65s-14.64,3.08-14.8,18.26,24.33,19.33,31,10.13c0,0-8.34,12.88-24.53,9S526.14,864.42,559,861.65Z"
                      fill="#7370bd"
                      opacity="0.2"
                      style={{ mixBlendMode: "multiply" }}
                    />
                    <circle cx="562.1" cy="870.89" r="4.91" fill="#fff" />
                    <path d="M571.34,879.77a2.86,2.86,0,1,0-2.86,2.86A2.86,2.86,0,0,0,571.34,879.77Z" fill="#fff" />
                  </g>
                  <path
                    d="M541.86,843.61s-6.93,62.77,47.17,58.27v8.3H527.3V843.26Z"
                    fill="#7370bd"
                    opacity="0.2"
                    style={{ mixBlendMode: "multiply" }}
                  />
                </g>
                <rect x="386.15" y="890.66" width="9.47" height="12.32" rx="0.88" fill="#ff8d7b" />
                <g clipPath="url(#clipPath-159)">
                  <path
                    d="M391.62,890a7.25,7.25,0,0,0-2.52,5.26c0,3.26.31,6,8,6v3.05H384.25v-14.1Z"
                    fill="#b55243"
                    opacity="0.2"
                    style={{ mixBlendMode: "multiply" }}
                  />
                </g>
                <rect
                  x="410.39"
                  y="890.66"
                  width="9.47"
                  height="12.32"
                  rx="0.88"
                  transform="translate(-198.95 122.53) rotate(-13.58)"
                  fill="#7370bd"
                  opacity="0.2"
                  style={{ mixBlendMode: "multiply" }}
                />
                <g clipPath="url(#clipPath-160)">
                  <path
                    d="M414.25,890a7.23,7.23,0,0,0-1.22,5.71c.77,3.17,1.72,5.76,9.18,4l.72,3-12.48,3L407.14,892Z"
                    fill="#4b3757"
                    opacity="0.2"
                    style={{ mixBlendMode: "multiply" }}
                  />
                </g>
                <rect
                  x="417.56"
                  y="857.82"
                  width="9.16"
                  height="10.36"
                  rx="0.88"
                  fill="#7370bd"
                  opacity="0.2"
                  style={{ mixBlendMode: "multiply" }}
                />
                <g clipPath="url(#clipPath-161)">
                  <path
                    d="M422.86,857.28a6,6,0,0,0-2.44,4.43c0,2.74.3,5,7.73,5v2.56H415.73V857.46Z"
                    fill="#4b3757"
                    opacity="0.2"
                    style={{ mixBlendMode: "multiply" }}
                  />
                </g>
                <rect x="407.33" y="857.82" width="9.16" height="10.36" rx="0.88" fill="#ffea97" />
                <g clipPath="url(#clipPath-162)">
                  <path
                    d="M412.63,857.28a6,6,0,0,0-2.45,4.43c0,2.74.31,5,7.74,5v2.56H405.5V857.46Z"
                    fill="#b55243"
                    opacity="0.2"
                    style={{ mixBlendMode: "multiply" }}
                  />
                </g>
                <rect
                  x="429.44"
                  y="857.28"
                  width="9.47"
                  height="12.32"
                  rx="0.88"
                  transform="translate(-429.26 1297.62) rotate(-90)"
                  fill="#ff8d7b"
                />
                <g clipPath="url(#clipPath-163)">
                  <path
                    d="M427.39,862.7a7.24,7.24,0,0,0,5.26,2.53c3.27,0,6-.32,6-8h3.06v12.84H427.6Z"
                    fill="#b55243"
                    opacity="0.2"
                    style={{ mixBlendMode: "multiply" }}
                  />
                </g>
                <rect
                  x="399.04"
                  y="892.08"
                  width="9.47"
                  height="12.32"
                  rx="0.88"
                  transform="translate(-494.46 1302.02) rotate(-90)"
                  fill="#fff"
                />
                <g clipPath="url(#clipPath-164)">
                  <path
                    d="M397,897.5a7.24,7.24,0,0,0,5.26,2.53c3.27,0,6-.32,6-8h3.06v12.84H397.2Z"
                    fill="#b55243"
                    opacity="0.2"
                    style={{ mixBlendMode: "multiply" }}
                  />
                </g>
                <rect x="383.1" y="902.82" width="59.88" height="1.54" fill="#4b3757" />
                <g clipPath="url(#clipPath-165)">
                  <path
                    d="M403.11,902.4s13.32,2.06,43,1.7v1h-63l-1.5-2.32,1-.48Z"
                    fill="#4b3757"
                    opacity="0.2"
                    style={{ mixBlendMode: "multiply" }}
                  />
                </g>
                <rect x="383.1" y="885.49" width="59.88" height="1.54" fill="#4b3757" />
                <g clipPath="url(#clipPath-166)">
                  <path
                    d="M403.11,885.08s13.32,2.06,43,1.7v1h-63l-1.5-2.32,1-.49Z"
                    fill="#4b3757"
                    opacity="0.2"
                    style={{ mixBlendMode: "multiply" }}
                  />
                </g>
                <rect x="383.1" y="868.17" width="59.88" height="1.54" fill="#4b3757" />
                <g clipPath="url(#clipPath-167)">
                  <path
                    d="M403.11,867.76s13.32,2.06,43,1.7v1h-63l-1.5-2.32,1-.49Z"
                    fill="#4b3757"
                    opacity="0.2"
                    style={{ mixBlendMode: "multiply" }}
                  />
                </g>
                <rect x="383.1" y="852.27" width="59.88" height="1.54" fill="#4b3757" />
                <g clipPath="url(#clipPath-168)">
                  <path
                    d="M403.11,851.86s13.32,2.06,43,1.7v1h-63l-1.5-2.31,1-.49Z"
                    fill="#4b3757"
                    opacity="0.2"
                    style={{ mixBlendMode: "multiply" }}
                  />
                </g>
                <rect
                  x="353.21"
                  y="881.52"
                  width="60.05"
                  height="1.54"
                  transform="translate(1265.53 499.06) rotate(90)"
                  fill="#4b3757"
                />
                <g clipPath="url(#clipPath-169)">
                  <path
                    d="M384.42,872.34s-2.06,13.36-1.7,43.16h-1V852.27l2.32-1.5.48,1Z"
                    fill="#4b3757"
                    opacity="0.2"
                    style={{ mixBlendMode: "multiply" }}
                  />
                </g>
                <rect
                  x="412.19"
                  y="881.52"
                  width="60.05"
                  height="1.54"
                  transform="translate(1324.52 440.08) rotate(90)"
                  fill="#4b3757"
                />
                <g clipPath="url(#clipPath-170)">
                  <path
                    d="M443.4,872.34s-2.06,13.36-1.7,43.16h-1V852.27l2.31-1.5.49,1Z"
                    fill="#4b3757"
                    opacity="0.2"
                    style={{ mixBlendMode: "multiply" }}
                  />
                </g>
                <polygon
                  points="316.48 789.2 265.93 889.78 392.69 889.78 342.13 789.2 316.48 789.2"
                  opacity="0.5"
                  fill="url(#Degradado_sin_nombre_3-8)"
                  style={{ mixBlendMode: "overlay" }}
                />
                <polygon
                  points="408.27 789.2 357.72 889.78 484.48 889.78 433.92 789.2 408.27 789.2"
                  opacity="0.46"
                  fill="url(#Degradado_sin_nombre_3-9)"
                  style={{ mixBlendMode: "overlay" }}
                />
                <polygon
                  points="499.22 789.2 448.66 889.78 575.42 889.78 524.87 789.2 499.22 789.2"
                  opacity="0.5"
                  fill="url(#Degradado_sin_nombre_3-10)"
                  style={{ mixBlendMode: "overlay" }}
                />
                <rect
                  id="Basement_Dark"
                  style={{ display: this.state.rooms.find((r) => r.Name === "Basement").displayStyle }}
                  x="250.82"
                  y="786.76"
                  width="346.69"
                  height="132"
                  opacity="0.9"
                />
              </g>
              <rect x="416.04" y="657.92" width="178.9" height="132" fill="#ead16c" />
              <g clipPath="url(#clipPath-171)">
                <rect x="413.55" y="778.61" width="181.4" height="10.78" fill="#b55243" />
                <rect x="428.02" y="718.8" width="41.82" height="71.87" fill="#fff" />
                <g clipPath="url(#clipPath-172)">
                  <path
                    d="M447.34,753.49H431.67V722.25h15.67Zm18.25-31.24H449.92v31.24h15.67Zm-18.25,33.91H431.67V787.4h15.67Zm18.25,0H449.92V787.4h15.67Z"
                    fill="#7370bd"
                    opacity="0.3"
                    style={{ mixBlendMode: "multiply" }}
                  />
                  <polygon
                    points="447.34 752.93 432.2 752.93 432.2 722.25 431.67 722.25 431.67 753.49 447.34 753.49 447.34 752.93"
                    fill="#7370bd"
                    opacity="0.3"
                    style={{ mixBlendMode: "multiply" }}
                  />
                  <polygon
                    points="465.59 752.93 450.45 752.93 450.45 722.25 449.92 722.25 449.92 753.49 465.59 753.49 465.59 752.93"
                    fill="#7370bd"
                    opacity="0.3"
                    style={{ mixBlendMode: "multiply" }}
                  />
                  <polygon
                    points="432.2 786.83 432.2 756.16 431.67 756.16 431.67 787.39 447.34 787.39 447.34 786.83 432.2 786.83"
                    fill="#7370bd"
                    opacity="0.3"
                    style={{ mixBlendMode: "multiply" }}
                  />
                  <polygon
                    points="450.45 786.83 450.45 756.16 449.92 756.16 449.92 787.39 465.59 787.39 465.59 786.83 450.45 786.83"
                    fill="#7370bd"
                    opacity="0.3"
                    style={{ mixBlendMode: "multiply" }}
                  />
                  <path
                    d="M433.94,715.54s-2.56,53.29,8,61.19,33.54,7.9,33.54,7.9v12.88H424.74V717.69Z"
                    fill="#7370bd"
                    opacity="0.2"
                    style={{ mixBlendMode: "multiply" }}
                  />
                  <rect x="466.51" y="750.76" width="2.02" height="13.81" fill="#ffea97" />
                  <g clipPath="url(#clipPath-173)">
                    <path
                      d="M466.92,750.28s.2,14.25,2.92,14.35v2.16h-5.58L465.69,750Z"
                      fill="#b55243"
                      opacity="0.2"
                      style={{ mixBlendMode: "multiply" }}
                    />
                  </g>
                </g>
                <rect
                  x="568.01"
                  y="787.57"
                  width="13.88"
                  height="3.88"
                  transform="translate(-214.55 1364.46) rotate(-90)"
                  fill="#4b3757"
                />
                <g clipPath="url(#clipPath-174)">
                  <path
                    d="M578.32,784.85s-5.91-2-3.36,11.6-5.28,0-5.28,0l1.26-15.38,8.52-.58Z"
                    fill="#7370bd"
                    opacity="0.2"
                    style={{ mixBlendMode: "multiply" }}
                  />
                </g>
                <rect x="556.14" y="778.42" width="33.76" height="4.15" fill="#ffe8cf" />
                <g clipPath="url(#clipPath-175)">
                  <path
                    d="M563,775.62s-1.79,7.75,30.31,7v3.1h-39.6v-8.79Z"
                    fill="#7370bd"
                    opacity="0.2"
                    style={{ mixBlendMode: "multiply" }}
                  />
                </g>
                <rect
                  x="551.14"
                  y="773.69"
                  width="13.88"
                  height="3.88"
                  transform="translate(-217.55 1333.7) rotate(-90)"
                  fill="#4b3757"
                />
                <g clipPath="url(#clipPath-176)">
                  <path
                    d="M561.44,771s-5.91-2-3.36,11.6-5.28,0-5.28,0l1.27-15.39,8.51-.57Z"
                    fill="#7370bd"
                    opacity="0.2"
                    style={{ mixBlendMode: "multiply" }}
                  />
                </g>
                <rect
                  x="551.07"
                  y="773.58"
                  width="13.88"
                  height="3.88"
                  transform="translate(-217.51 1333.52) rotate(-90)"
                  fill="#4b3757"
                />
                <g clipPath="url(#clipPath-177)">
                  <path
                    d="M561.37,770.86s-5.91-2-3.36,11.6-5.28,0-5.28,0L554,767.07l8.51-.57Z"
                    fill="#7370bd"
                    opacity="0.2"
                    style={{ mixBlendMode: "multiply" }}
                  />
                </g>
                <rect x="539.19" y="764.43" width="33.76" height="4.15" fill="#ffe8cf" />
                <g clipPath="url(#clipPath-178)">
                  <path
                    d="M546.05,761.63s-1.79,7.75,30.31,6.94v3.11h-39.6v-8.79Z"
                    fill="#7370bd"
                    opacity="0.2"
                    style={{ mixBlendMode: "multiply" }}
                  />
                </g>
                <rect
                  x="534.19"
                  y="759.69"
                  width="13.88"
                  height="3.88"
                  transform="translate(-220.5 1302.76) rotate(-90)"
                  fill="#4b3757"
                />
                <g clipPath="url(#clipPath-179)">
                  <path
                    d="M544.49,757s-5.91-2-3.36,11.59-5.28,0-5.28,0l1.27-15.38,8.51-.57Z"
                    fill="#7370bd"
                    opacity="0.2"
                    style={{ mixBlendMode: "multiply" }}
                  />
                </g>
                <rect
                  x="534.12"
                  y="759.58"
                  width="13.88"
                  height="3.88"
                  transform="translate(-220.46 1302.58) rotate(-90)"
                  fill="#4b3757"
                />
                <g clipPath="url(#clipPath-180)">
                  <path
                    d="M544.42,756.87s-5.91-2-3.36,11.59-5.28,0-5.28,0l1.27-15.38,8.51-.57Z"
                    fill="#7370bd"
                    opacity="0.2"
                    style={{ mixBlendMode: "multiply" }}
                  />
                </g>
                <rect x="522.24" y="750.44" width="33.76" height="4.15" fill="#ffe8cf" />
                <g clipPath="url(#clipPath-181)">
                  <path
                    d="M529.1,747.64s-1.79,7.75,30.31,6.94v3.11h-39.6V748.9Z"
                    fill="#7370bd"
                    opacity="0.2"
                    style={{ mixBlendMode: "multiply" }}
                  />
                </g>
                <rect
                  x="517.24"
                  y="745.7"
                  width="13.88"
                  height="3.88"
                  transform="translate(-223.46 1271.82) rotate(-90)"
                  fill="#4b3757"
                />
                <g clipPath="url(#clipPath-182)">
                  <path
                    d="M527.54,743s-5.9-2-3.36,11.59-5.27,0-5.27,0l1.26-15.38,8.51-.57Z"
                    fill="#7370bd"
                    opacity="0.2"
                    style={{ mixBlendMode: "multiply" }}
                  />
                </g>
                <rect
                  x="517.17"
                  y="745.59"
                  width="13.88"
                  height="3.88"
                  transform="translate(-223.42 1271.64) rotate(-90)"
                  fill="#4b3757"
                />
                <g clipPath="url(#clipPath-183)">
                  <path
                    d="M527.47,742.88s-5.9-2-3.36,11.59-5.27,0-5.27,0l1.26-15.38,8.51-.57Z"
                    fill="#7370bd"
                    opacity="0.2"
                    style={{ mixBlendMode: "multiply" }}
                  />
                </g>
                <rect x="505.29" y="736.45" width="33.76" height="4.15" fill="#ffe8cf" />
                <g clipPath="url(#clipPath-184)">
                  <path
                    d="M512.15,733.65s-1.79,7.74,30.31,6.94v3.1H502.87v-8.78Z"
                    fill="#7370bd"
                    opacity="0.2"
                    style={{ mixBlendMode: "multiply" }}
                  />
                </g>
                <rect
                  x="500.29"
                  y="731.71"
                  width="13.88"
                  height="3.88"
                  transform="translate(-226.42 1240.88) rotate(-90)"
                  fill="#4b3757"
                />
                <g clipPath="url(#clipPath-185)">
                  <path
                    d="M510.59,729s-5.9-2-3.36,11.59-5.27,0-5.27,0l1.26-15.38,8.52-.57Z"
                    fill="#7370bd"
                    opacity="0.2"
                    style={{ mixBlendMode: "multiply" }}
                  />
                </g>
                <rect
                  x="500.22"
                  y="731.6"
                  width="13.88"
                  height="3.88"
                  transform="translate(-226.38 1240.7) rotate(-90)"
                  fill="#4b3757"
                />
                <g clipPath="url(#clipPath-186)">
                  <path
                    d="M510.52,728.89s-5.9-2-3.36,11.59-5.27,0-5.27,0l1.26-15.38,8.52-.57Z"
                    fill="#7370bd"
                    opacity="0.2"
                    style={{ mixBlendMode: "multiply" }}
                  />
                </g>
                <rect x="488.35" y="722.45" width="33.76" height="4.15" fill="#ffe8cf" />
                <g clipPath="url(#clipPath-187)">
                  <path
                    d="M495.21,719.66s-1.8,7.74,30.31,6.94v3.1h-39.6v-8.78Z"
                    fill="#7370bd"
                    opacity="0.2"
                    style={{ mixBlendMode: "multiply" }}
                  />
                </g>
                <rect
                  x="483.34"
                  y="717.72"
                  width="13.88"
                  height="3.88"
                  transform="translate(-229.37 1209.94) rotate(-90)"
                  fill="#4b3757"
                />
                <g clipPath="url(#clipPath-188)">
                  <path
                    d="M493.65,715s-5.91-2-3.36,11.59-5.28,0-5.28,0l1.26-15.38,8.52-.57Z"
                    fill="#7370bd"
                    opacity="0.2"
                    style={{ mixBlendMode: "multiply" }}
                  />
                </g>
                <rect
                  x="483.27"
                  y="717.61"
                  width="13.88"
                  height="3.88"
                  transform="translate(-229.33 1209.77) rotate(-90)"
                  fill="#4b3757"
                />
                <g clipPath="url(#clipPath-189)">
                  <path
                    d="M493.58,714.9s-5.91-2-3.36,11.59-5.28,0-5.28,0l1.26-15.38,8.52-.57Z"
                    fill="#7370bd"
                    opacity="0.2"
                    style={{ mixBlendMode: "multiply" }}
                  />
                </g>
                <rect x="471.4" y="708.46" width="33.76" height="4.15" fill="#ffe8cf" />
                <g clipPath="url(#clipPath-190)">
                  <path
                    d="M478.26,705.67s-1.79,7.74,30.31,6.94v3.1H469v-8.78Z"
                    fill="#7370bd"
                    opacity="0.2"
                    style={{ mixBlendMode: "multiply" }}
                  />
                </g>
                <rect
                  x="466.4"
                  y="703.73"
                  width="13.88"
                  height="3.88"
                  transform="translate(-232.33 1179.01) rotate(-90)"
                  fill="#4b3757"
                />
                <g clipPath="url(#clipPath-191)">
                  <path
                    d="M476.7,701s-5.91-2-3.36,11.59-5.28,0-5.28,0l1.27-15.38,8.51-.58Z"
                    fill="#7370bd"
                    opacity="0.2"
                    style={{ mixBlendMode: "multiply" }}
                  />
                </g>
                <rect
                  x="466.33"
                  y="703.62"
                  width="13.88"
                  height="3.88"
                  transform="translate(-232.29 1178.83) rotate(-90)"
                  fill="#4b3757"
                />
                <g clipPath="url(#clipPath-192)">
                  <path
                    d="M476.63,700.91s-5.91-2-3.36,11.59-5.28,0-5.28,0l1.27-15.38,8.51-.58Z"
                    fill="#7370bd"
                    opacity="0.2"
                    style={{ mixBlendMode: "multiply" }}
                  />
                </g>
                <rect x="454.45" y="694.47" width="33.76" height="4.15" fill="#ffe8cf" />
                <g clipPath="url(#clipPath-193)">
                  <path
                    d="M461.31,691.68s-1.79,7.74,30.31,6.94v3.1H452v-8.79Z"
                    fill="#7370bd"
                    opacity="0.2"
                    style={{ mixBlendMode: "multiply" }}
                  />
                </g>
                <rect
                  x="449.45"
                  y="689.74"
                  width="13.88"
                  height="3.88"
                  transform="translate(-235.29 1148.07) rotate(-90)"
                  fill="#4b3757"
                />
                <g clipPath="url(#clipPath-194)">
                  <path
                    d="M459.75,687s-5.91-2-3.36,11.6-5.28,0-5.28,0l1.27-15.38,8.51-.58Z"
                    fill="#7370bd"
                    opacity="0.2"
                    style={{ mixBlendMode: "multiply" }}
                  />
                </g>
                <rect
                  x="449.38"
                  y="689.63"
                  width="13.88"
                  height="3.88"
                  transform="translate(-235.25 1147.89) rotate(-90)"
                  fill="#4b3757"
                />
                <g clipPath="url(#clipPath-195)">
                  <path
                    d="M459.68,686.92s-5.91-2-3.36,11.59-5.28,0-5.28,0l1.27-15.38,8.51-.58Z"
                    fill="#7370bd"
                    opacity="0.2"
                    style={{ mixBlendMode: "multiply" }}
                  />
                </g>
                <rect x="437.5" y="680.48" width="33.76" height="4.15" fill="#ffe8cf" />
                <g clipPath="url(#clipPath-196)">
                  <path
                    d="M444.36,677.69s-1.79,7.74,30.31,6.94v3.1h-39.6v-8.79Z"
                    fill="#7370bd"
                    opacity="0.2"
                    style={{ mixBlendMode: "multiply" }}
                  />
                </g>
                <rect
                  x="432.5"
                  y="675.75"
                  width="13.88"
                  height="3.88"
                  transform="translate(-238.24 1117.13) rotate(-90)"
                  fill="#4b3757"
                />
                <g clipPath="url(#clipPath-197)">
                  <path
                    d="M442.8,673s-5.9-2-3.36,11.6-5.27,0-5.27,0l1.26-15.39,8.51-.57Z"
                    fill="#7370bd"
                    opacity="0.2"
                    style={{ mixBlendMode: "multiply" }}
                  />
                </g>
                <rect
                  x="432.43"
                  y="675.64"
                  width="13.88"
                  height="3.88"
                  transform="translate(-238.2 1116.95) rotate(-90)"
                  fill="#4b3757"
                />
                <g clipPath="url(#clipPath-198)">
                  <path
                    d="M442.73,672.92s-5.9-2-3.36,11.6-5.27,0-5.27,0l1.26-15.38,8.51-.58Z"
                    fill="#7370bd"
                    opacity="0.2"
                    style={{ mixBlendMode: "multiply" }}
                  />
                </g>
                <rect x="420.56" y="666.49" width="33.76" height="4.15" fill="#ffe8cf" />
                <g clipPath="url(#clipPath-199)">
                  <path
                    d="M427.41,663.69s-1.79,7.75,30.32,6.95v3.1h-39.6V665Z"
                    fill="#7370bd"
                    opacity="0.2"
                    style={{ mixBlendMode: "multiply" }}
                  />
                </g>
                <rect
                  x="415.55"
                  y="661.76"
                  width="13.88"
                  height="3.88"
                  transform="translate(-241.2 1086.19) rotate(-90)"
                  fill="#4b3757"
                />
                <g clipPath="url(#clipPath-200)">
                  <path
                    d="M425.85,659s-5.9-2-3.36,11.6-5.27,0-5.27,0l1.26-15.39,8.52-.57Z"
                    fill="#7370bd"
                    opacity="0.2"
                    style={{ mixBlendMode: "multiply" }}
                  />
                </g>
                <path
                  d="M409.69,817.13S421,731.76,497.43,692c57.9-30.18,108.09-20.1,108.09-20.1v-18.3H407.68Z"
                  fill="#b55243"
                  opacity="0.2"
                  style={{ mixBlendMode: "multiply" }}
                />
                <polygon
                  points="548.92 659.42 516.68 760 597.51 760 565.27 659.42 548.92 659.42"
                  fill="url(#Degradado_sin_nombre_3-11)"
                  style={{ mixBlendMode: "overlay" }}
                />
                <polygon
                  points="462.76 659.42 430.53 760 511.35 760 479.12 659.42 462.76 659.42"
                  fill="url(#Degradado_sin_nombre_3-12)"
                  style={{ mixBlendMode: "overlay" }}
                />
                <rect
                  id="GF_Stairs_Dark"
                  style={{ display: this.state.rooms.find((r) => r.Name === "GF_Stairs").displayStyle }}
                  x="416.04"
                  y="658.39"
                  width="178.53"
                  height="132"
                  opacity="0.9"
                />
              </g>
              <rect x="594.57" y="657.92" width="229.11" height="132" fill="#d3d2ff" />
              <g clipPath="url(#clipPath-201)">
                <rect x="609.1" y="686.79" width="45.51" height="98.39" fill="#7370bd" />
                <g clipPath="url(#clipPath-202)">
                  <path
                    d="M613.55,683.21s.21,34.72,46.15,34.72v5.16H604.22V683.68Z"
                    fill="#7370bd"
                    opacity="0.2"
                    style={{ mixBlendMode: "multiply" }}
                  />
                  <rect x="649.08" y="699.3" width="1.73" height="12.79" fill="#4b3757" />
                </g>
                <rect x="609.1" y="722.15" width="45.51" height="63.03" fill="#7370bd" />
                <g clipPath="url(#clipPath-203)">
                  <rect x="606.39" y="720.92" width="50.72" height="3.25" fill="#fff" />
                  <path
                    d="M611.59,720.06S610,780.85,657.1,780.85V788H606.39V720.06Z"
                    fill="#7370bd"
                    opacity="0.2"
                    style={{ mixBlendMode: "multiply" }}
                  />
                  <rect x="649.08" y="747.8" width="1.73" height="12.79" fill="#4b3757" />
                </g>
                <rect x="693.56" y="671.62" width="23.29" height="33.81" fill="#fff" />
                <g clipPath="url(#clipPath-204)">
                  <path
                    d="M718.83,672.88S700,671,700,681.07v26.29h-8.73v-37.9h27.54Z"
                    fill="#7370bd"
                    opacity="0.2"
                    style={{ mixBlendMode: "multiply" }}
                  />
                  <rect x="713.83" y="684.43" width="1.45" height="8.27" fill="#4b3757" />
                </g>
                <rect x="716.85" y="671.62" width="23.29" height="33.81" fill="#fff" />
                <g clipPath="url(#clipPath-205)">
                  <path
                    d="M742.12,672.88s-18.81-1.93-18.81,8.19v26.29h-8.73v-37.9h27.54Z"
                    fill="#7370bd"
                    opacity="0.2"
                    style={{ mixBlendMode: "multiply" }}
                  />
                  <rect x="718.44" y="684.43" width="1.45" height="8.27" fill="#4b3757" />
                </g>
                <rect x="740.14" y="671.62" width="23.29" height="33.81" fill="#fff" />
                <g clipPath="url(#clipPath-206)">
                  <path
                    d="M765.41,672.88S746.6,671,746.6,681.07v26.29h-8.73v-37.9h27.54Z"
                    fill="#7370bd"
                    opacity="0.2"
                    style={{ mixBlendMode: "multiply" }}
                  />
                  <rect x="760.41" y="684.43" width="1.45" height="8.27" fill="#4b3757" />
                </g>
                <rect x="763.43" y="671.62" width="23.29" height="33.81" fill="#fff" />
                <g clipPath="url(#clipPath-207)">
                  <path
                    d="M788.7,672.88s-18.81-1.93-18.81,8.19v26.29h-8.73v-37.9H788.7Z"
                    fill="#7370bd"
                    opacity="0.2"
                    style={{ mixBlendMode: "multiply" }}
                  />
                  <rect x="765.02" y="684.43" width="1.45" height="8.27" fill="#4b3757" />
                </g>
                <rect x="786.72" y="671.62" width="23.29" height="33.81" fill="#fff" />
                <g clipPath="url(#clipPath-208)">
                  <path
                    d="M812,672.88s-18.81-1.93-18.81,8.19v26.29h-8.73v-37.9H812Z"
                    fill="#7370bd"
                    opacity="0.2"
                    style={{ mixBlendMode: "multiply" }}
                  />
                  <rect x="806.99" y="684.43" width="1.45" height="8.27" fill="#4b3757" />
                </g>
                <path
                  d="M747.6,730.56h-2.7a1,1,0,0,1-1-.77l-.43-1.91a1,1,0,0,1,1-1.19H748a1,1,0,0,1,1,1.19l-.43,1.91A1,1,0,0,1,747.6,730.56Z"
                  fill="#7370bd"
                />
                <g clipPath="url(#clipPath-209)">
                  <path
                    d="M746.25,726.06a2,2,0,0,0-1.27,2c0,1.67,4,1.61,4,1.61v.85h-5.88v-3.87Z"
                    fill="#7370bd"
                    opacity="0.2"
                    style={{ mixBlendMode: "multiply" }}
                  />
                </g>
                <path
                  d="M731.53,730.56h-2.7a1,1,0,0,1-1-.77l-.43-1.91a1,1,0,0,1,.95-1.19H732a1,1,0,0,1,1,1.19l-.43,1.91A1,1,0,0,1,731.53,730.56Z"
                  fill="#7370bd"
                />
                <g clipPath="url(#clipPath-210)">
                  <path
                    d="M730.18,726.06a2,2,0,0,0-1.27,2c0,1.67,4,1.61,4,1.61v.85h-5.88v-3.87Z"
                    fill="#7370bd"
                    opacity="0.2"
                    style={{ mixBlendMode: "multiply" }}
                  />
                </g>
                <path
                  d="M738,734.45h0a1.68,1.68,0,0,1-1.67-1.68V714.16a1.67,1.67,0,0,1,1.67-1.67h0a1.68,1.68,0,0,1,1.68,1.67v18.61A1.68,1.68,0,0,1,738,734.45Z"
                  fill="#fff"
                />
                <g clipPath="url(#clipPath-211)">
                  <path
                    d="M739.72,711.82s-2.31.42-2.31,3.89v10.63a2.21,2.21,0,0,0,2.21,2.21H741v2.83h-6.11V711.82Z"
                    fill="#7370bd"
                    opacity="0.2"
                    style={{ mixBlendMode: "multiply" }}
                  />
                </g>
                <path
                  d="M666.46,727.2a3.61,3.61,0,0,0,2.18,1.62,8.93,8.93,0,0,0,2.27.27,8.53,8.53,0,0,0,2.28-.27,3.58,3.58,0,0,0,2.18-1.62l0-.05a.09.09,0,0,1,.13,0,.1.1,0,0,1,0,.07,3.46,3.46,0,0,1-1.48,2.91,5.65,5.65,0,0,1-6.36,0,3.48,3.48,0,0,1-1.47-2.91.1.1,0,0,1,.1-.09.1.1,0,0,1,.07,0Z"
                  fill="#4b3757"
                />
                <path
                  d="M671.15,727.78l.37,2.79a.61.61,0,1,1-1.21.16.43.43,0,0,1,0-.16l.37-2.79a.24.24,0,0,1,.27-.2A.22.22,0,0,1,671.15,727.78Z"
                  fill="#4b3757"
                />
                <path
                  d="M689.38,727.2a3.61,3.61,0,0,0,2.18,1.62,8.93,8.93,0,0,0,2.27.27,8.53,8.53,0,0,0,2.28-.27,3.58,3.58,0,0,0,2.18-1.62l0-.05a.09.09,0,0,1,.13,0,.1.1,0,0,1,0,.07,3.46,3.46,0,0,1-1.48,2.91,5.65,5.65,0,0,1-6.36,0,3.48,3.48,0,0,1-1.47-2.91.1.1,0,0,1,.1-.09.1.1,0,0,1,.07,0Z"
                  fill="#4b3757"
                />
                <path
                  d="M694.07,727.78l.37,2.79a.62.62,0,0,1-.53.69.62.62,0,0,1-.68-.53.43.43,0,0,1,0-.16l.37-2.79a.24.24,0,0,1,.27-.2A.22.22,0,0,1,694.07,727.78Z"
                  fill="#4b3757"
                />
                <rect x="654.61" y="729.7" width="156.7" height="55.48" fill="#fff" />
                <rect x="654.61" y="729.7" width="156.7" height="3.36" fill="#4b3757" />
                <g clipPath="url(#clipPath-212)">
                  <path
                    d="M682.38,726.61s-30.65,5.57,133.56,5.57v2h-164v-7.6Z"
                    fill="#7370bd"
                    opacity="0.2"
                    style={{ mixBlendMode: "multiply" }}
                  />
                </g>
                <rect x="654.61" y="735.99" width="27.77" height="49.2" fill="#fff" />
                <g clipPath="url(#clipPath-213)">
                  <path
                    d="M684.73,737.83S662.3,735,662.3,749.75V788H651.9V732.84h32.83Z"
                    fill="#7370bd"
                    opacity="0.2"
                    style={{ mixBlendMode: "multiply" }}
                  />
                  <rect x="678.77" y="754.63" width="1.73" height="12.03" fill="#4b3757" />
                </g>
                <rect x="765.67" y="735.99" width="45.63" height="16.15" fill="#fff" />
                <g clipPath="url(#clipPath-214)">
                  <path
                    d="M812.5,738.26s-40.42-3.75-43.13,5.8c-2.6,9.16.87,11.76.87,11.76h-6.43V733.71h50.64Z"
                    fill="#7370bd"
                    opacity="0.2"
                    style={{ mixBlendMode: "multiply" }}
                  />
                  <rect x="783.55" y="743.4" width="9.87" height="1.33" fill="#4b3757" />
                </g>
                <rect x="765.67" y="752.13" width="45.63" height="16.15" fill="#fff" />
                <g clipPath="url(#clipPath-215)">
                  <path
                    d="M812.5,754.41s-40.42-3.75-43.13,5.8c-2.6,9.15.87,11.75.87,11.75h-6.43v-22.1h50.64Z"
                    fill="#7370bd"
                    opacity="0.2"
                    style={{ mixBlendMode: "multiply" }}
                  />
                  <rect x="783.55" y="759.54" width="9.87" height="1.32" fill="#4b3757" />
                </g>
                <rect x="765.67" y="768.28" width="45.63" height="16.15" fill="#fff" />
                <g clipPath="url(#clipPath-216)">
                  <path
                    d="M812.5,770.55s-40.42-3.74-43.13,5.8c-2.6,9.16.87,11.76.87,11.76h-6.43V766h50.64Z"
                    fill="#7370bd"
                    opacity="0.2"
                    style={{ mixBlendMode: "multiply" }}
                  />
                  <rect x="783.55" y="775.69" width="9.87" height="1.32" fill="#4b3757" />
                </g>
                <rect x="682.38" y="735.99" width="27.77" height="49.2" fill="#fff" />
                <g clipPath="url(#clipPath-217)">
                  <path
                    d="M712.5,737.83s-22.43-2.82-22.43,11.92V788h-10.4V732.84H712.5Z"
                    fill="#7370bd"
                    opacity="0.2"
                    style={{ mixBlendMode: "multiply" }}
                  />
                  <rect x="684.27" y="754.63" width="1.73" height="12.03" fill="#4b3757" />
                </g>
                <rect x="710.14" y="735.99" width="27.77" height="49.2" fill="#fff" />
                <g clipPath="url(#clipPath-218)">
                  <path
                    d="M740.27,737.83s-22.44-2.82-22.44,11.92V788h-10.4V732.84h32.84Z"
                    fill="#7370bd"
                    opacity="0.2"
                    style={{ mixBlendMode: "multiply" }}
                  />
                  <rect x="734.31" y="754.63" width="1.73" height="12.03" fill="#4b3757" />
                </g>
                <rect x="737.91" y="735.99" width="27.77" height="49.2" fill="#fff" />
                <g clipPath="url(#clipPath-219)">
                  <path
                    d="M768,737.83S745.6,735,745.6,749.75V788H735.2V732.84H768Z"
                    fill="#7370bd"
                    opacity="0.2"
                    style={{ mixBlendMode: "multiply" }}
                  />
                  <rect x="762.07" y="754.63" width="1.73" height="12.03" fill="#4b3757" />
                </g>
                <path
                  d="M591.94,805.71S605.65,723.42,698,685c70-29.09,130.7-19.37,130.7-19.37V648H589.52Z"
                  fill="#7370bd"
                  opacity="0.2"
                  style={{ mixBlendMode: "multiply" }}
                />
                <polygon
                  points="648.13 659.42 609.48 760 706.39 760 667.74 659.42 648.13 659.42"
                  fill="url(#Degradado_sin_nombre_3-13)"
                  style={{ mixBlendMode: "overlay" }}
                />
                <polygon
                  points="755.93 659.42 717.28 760 814.19 760 775.54 659.42 755.93 659.42"
                  fill="url(#Degradado_sin_nombre_3-14)"
                  style={{ mixBlendMode: "overlay" }}
                />
                <rect
                  id="Kitchen_Dark"
                  style={{ display: this.state.rooms.find((r) => r.Name === "Kitchen").displayStyle }}
                  x="594.65"
                  y="659.61"
                  width="228.73"
                  height="132"
                  opacity="0.9"
                />
              </g>
              <rect x="823.68" y="657.92" width="228.73" height="132" fill="#ffe8cf" />
              <g clipPath="url(#clipPath-220)">
                <rect x="821.72" y="775.83" width="233.78" height="15.77" fill="#ffea97" />
                <rect x="840.43" y="687.68" width="162.49" height="38.57" fill="#d3d2ff" />
                <g clipPath="url(#clipPath-221)">
                  <g opacity="0.2">
                    <rect
                      x="838.71"
                      y="651.75"
                      width="8.05"
                      height="90.86"
                      transform="translate(739.81 -391.71) rotate(45)"
                      fill="#fff"
                      opacity="0.5"
                    />
                    <rect
                      x="874.45"
                      y="669.88"
                      width="8.05"
                      height="90.86"
                      transform="translate(763.12 -411.67) rotate(45)"
                      fill="#fff"
                      opacity="0.5"
                    />
                    <rect
                      x="916.06"
                      y="669.88"
                      width="8.05"
                      height="90.86"
                      transform="translate(775.29 -441.09) rotate(45)"
                      fill="#fff"
                      opacity="0.5"
                    />
                    <rect
                      x="957.68"
                      y="669.88"
                      width="8.05"
                      height="90.86"
                      transform="translate(787.5 -470.52) rotate(45)"
                      fill="#fff"
                      opacity="0.5"
                    />
                    <rect
                      x="999.29"
                      y="669.88"
                      width="8.05"
                      height="90.86"
                      transform="translate(799.66 -499.94) rotate(45)"
                      fill="#fff"
                      opacity="0.5"
                    />
                    <rect
                      x="850.3"
                      y="659.22"
                      width="5.66"
                      height="90.86"
                      transform="translate(748.14 -396.86) rotate(45)"
                      fill="#fff"
                      opacity="0.5"
                    />
                    <rect
                      x="859.45"
                      y="669.88"
                      width="2.83"
                      height="90.86"
                      transform="translate(757.94 -399.22) rotate(45)"
                      fill="#fff"
                      opacity="0.5"
                    />
                    <rect
                      x="887.97"
                      y="673.17"
                      width="2.83"
                      height="90.86"
                      transform="translate(768.56 -418.41) rotate(45)"
                      fill="#fff"
                      opacity="0.5"
                    />
                    <rect
                      x="933.91"
                      y="673.17"
                      width="2.83"
                      height="90.86"
                      transform="translate(782.02 -450.89) rotate(45)"
                      fill="#fff"
                      opacity="0.5"
                    />
                    <rect
                      x="970.92"
                      y="673.17"
                      width="2.83"
                      height="90.86"
                      transform="translate(792.86 -477.06) rotate(45)"
                      fill="#fff"
                      opacity="0.5"
                    />
                  </g>
                </g>
                <path d="M1004.05,727.38H839.31V686.56h164.74Zm-162.49-2.26h160.23V688.81H841.56Z" fill="#4b3757" />
                <path
                  d="M854.3,791.76l10.9-33.49h12l-21.38,34.1C855.32,793.17,854,792.64,854.3,791.76Z"
                  fill="#ff654d"
                />
                <g clipPath="url(#clipPath-222)">
                  <path
                    d="M875,766.7s-7.89-.55-12,5.22-8.73,22.35-8.73,22.35l-8,1.42,16.61-35.77L879,761.2Z"
                    fill="#b55243"
                    opacity="0.2"
                    style={{ mixBlendMode: "multiply" }}
                  />
                </g>
                <path
                  d="M985.68,791.76l-10.9-33.49h-12l21.38,34.1C984.66,793.17,986,792.64,985.68,791.76Z"
                  fill="#ff654d"
                />
                <g clipPath="url(#clipPath-223)">
                  <path
                    d="M978.57,764.72s-6.75.41-4.32,5.94,11.47,22.6,11.47,22.6l-4.31,1-24.32-32,22.43-4Z"
                    fill="#b55243"
                    opacity="0.2"
                    style={{ mixBlendMode: "multiply" }}
                  />
                </g>
                <path
                  d="M993.67,755.84c0-3.56-33-4-73.71-4s-73.68.46-73.68,4c0,6.45,33,8.88,73.68,8.88S993.67,762.29,993.67,755.84Z"
                  fill="#4b3757"
                />
                <g clipPath="url(#clipPath-224)">
                  <path
                    d="M885.87,756.55S900.47,770,979,761.82s-14.68,10-14.68,10-112.06-1.29-119.95-9.49,6.63-14.4,6.63-14.4l34.88,8.66"
                    fill="#7370bd"
                    opacity="0.3"
                    style={{ mixBlendMode: "multiply" }}
                  />
                </g>
                <ellipse cx="919.99" cy="755.84" rx="73.68" ry="6.45" fill="#ff654d" />
                <g clipPath="url(#clipPath-225)">
                  <path
                    d="M890.78,745.46s-17,10.47,1.58,12.81,104.73,4.86,101.31-5.19c0,0,10.16,5.19-9.73,11.64s-121.67,2.34-129.68,0-12.11-5.61-11.8-10.89S890.78,745.46,890.78,745.46Z"
                    fill="#b55243"
                    opacity="0.2"
                    style={{ mixBlendMode: "multiply" }}
                  />
                </g>
                <path
                  d="M1042,767.63h-33.08c-5.65,25.68,16.54,23.85,16.54,23.85S1047.63,793.31,1042,767.63Z"
                  fill="#ff8d7b"
                />
                <g clipPath="url(#clipPath-226)">
                  <g opacity="0.3">
                    <path
                      d="M994.86,777.74s12.46-3.15,34.23-21.84"
                      fill="none"
                      stroke="#4b3757"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M999.54,781.45s12.47-3.15,34.23-21.83"
                      fill="none"
                      stroke="#4b3757"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M1004.22,785.17s12.47-3.15,34.24-21.84"
                      fill="none"
                      stroke="#4b3757"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M1008.91,788.89s12.47-3.16,34.23-21.84"
                      fill="none"
                      stroke="#4b3757"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M1013.59,792.6s12.47-3.15,34.23-21.84"
                      fill="none"
                      stroke="#4b3757"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M1018.28,796.32s12.46-3.16,34.23-21.84"
                      fill="none"
                      stroke="#4b3757"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                  <path
                    d="M1022.77,768.73s-5.22,3.39-3,13.79,23.08,4.51,22.29,2.66-.82,12.44-22.29,9.12S1008,766.37,1008,766.37l14.78,2.36"
                    fill="#7370bd"
                    opacity="0.3"
                    style={{ mixBlendMode: "multiply" }}
                  />
                </g>
                <ellipse cx="1025.45" cy="767.63" rx="16.54" ry="3.38" fill="#4b3757" />
                <g clipPath="url(#clipPath-227)">
                  <path
                    d="M1027.33,762.34s-12.16,10.59,13.66,6.43-18,8.91-18,8.91-18.27-3.49-18.39-10S1027.33,762.34,1027.33,762.34Z"
                    fill="#7370bd"
                    opacity="0.3"
                    style={{ mixBlendMode: "multiply" }}
                  />
                </g>
                <path
                  d="M1040.62,759.11l7.44-21.37L1035.33,757l4.08-31.32L1028.51,754l-7.1-36.56v45.13l-11.23-27.94,5.29,28.7-15.68-20,10.39,22.37c0,1.71,6.81,3.1,15.22,3.1s15.22-1.39,15.22-3.1l9.26-11.9Z"
                  fill="#7370bd"
                />
                <g clipPath="url(#clipPath-228)">
                  <path
                    d="M1027.37,725.65s-7.51,27.77-1.92,36.47,18.57,2.33,18.57,2.33.36,8.11-22.91,6.56-25.2-26-25.2-26l1.46-18.33,29.52-17.24Z"
                    fill="#7370bd"
                    opacity="0.3"
                    style={{ mixBlendMode: "multiply" }}
                  />
                </g>
                <path
                  d="M824.39,805.71s13.3-83.55,102.89-122.52c67.9-29.54,126.76-19.68,126.76-19.68v-17.9H822Z"
                  fill="#b55243"
                  opacity="0.2"
                  style={{ mixBlendMode: "multiply" }}
                />
                <polygon
                  points="876.8 659.42 826.68 760 952.35 760 902.23 659.42 876.8 659.42"
                  fill="url(#Degradado_sin_nombre_3-15)"
                  style={{ mixBlendMode: "overlay" }}
                />
                <polygon
                  points="982.54 659.42 932.42 760 1058.1 760 1007.98 659.42 982.54 659.42"
                  fill="url(#Degradado_sin_nombre_3-16)"
                  style={{ mixBlendMode: "overlay" }}
                />
                <rect
                  id="DiningRoom_Dark"
                  style={{ display: this.state.rooms.find((r) => r.Name === "DiningRoom").displayStyle }}
                  x="823.68"
                  y="657.92"
                  width="228.73"
                  height="132"
                  opacity="0.9"
                />
              </g>
              <rect x="594.57" y="525.61" width="229.11" height="132" fill="#ff8d7b" />
              <g clipPath="url(#clipPath-229)">
                <rect x="611.3" y="559.41" width="107.39" height="37.85" fill="#7370bd" />
                <g clipPath="url(#clipPath-230)">
                  <g opacity="0.2">
                    <rect
                      x="618.7"
                      y="517.17"
                      width="8.42"
                      height="95.05"
                      transform="translate(581.74 -275.07) rotate(45)"
                      fill="#fff"
                      opacity="0.5"
                    />
                    <rect
                      x="676.51"
                      y="536.14"
                      width="8.42"
                      height="95.05"
                      transform="translate(612.1 -310.39) rotate(45)"
                      fill="#fff"
                      opacity="0.5"
                    />
                    <rect
                      x="628.47"
                      y="524.99"
                      width="5.92"
                      height="95.05"
                      transform="translate(589.77 -278.8) rotate(45)"
                      fill="#fff"
                      opacity="0.5"
                    />
                    <rect
                      x="650.39"
                      y="536.14"
                      width="2.96"
                      height="95.05"
                      transform="translate(603.64 -289.99) rotate(45)"
                      fill="#fff"
                      opacity="0.5"
                    />
                    <rect
                      x="692.49"
                      y="539.58"
                      width="2.96"
                      height="95.05"
                      transform="translate(618.4 -318.76) rotate(45)"
                      fill="#fff"
                      opacity="0.5"
                    />
                  </g>
                </g>
                <path d="M719.68,598.27H610.3V558.41H719.68Zm-107.38-2H717.68V560.41H612.3Z" fill="#4b3757" />
                <path
                  d="M591.94,673.39S605.65,591.78,698,553.71c70-28.86,130.7-19.22,130.7-19.22V517H589.52Z"
                  fill="#b55243"
                  opacity="0.2"
                  style={{ mixBlendMode: "multiply" }}
                />
                <path d="M619.91,656.05l2.67-17.9h8.92l-9,18.7A1.38,1.38,0,0,1,619.91,656.05Z" fill="#4b3757" />
                <g clipPath="url(#clipPath-231)">
                  <path
                    d="M630.57,643.53s-5.68-1.56-7,1.76-2.76,13.58-2.76,13.58l-4-1.23L622.36,636l10.1,2.18Z"
                    fill="#4b3757"
                    opacity="0.2"
                    style={{ mixBlendMode: "multiply" }}
                  />
                </g>
                <path d="M717.68,656.05,715,638.15h-8.92l9,18.7A1.38,1.38,0,0,0,717.68,656.05Z" fill="#4b3757" />
                <g clipPath="url(#clipPath-232)">
                  <path
                    d="M716.72,640.9s-6.1,1.12-4.83,5.52,6.63,12.45,6.63,12.45l-5.37,1.25-9.32-22h15.63Z"
                    fill="#4b3757"
                    opacity="0.2"
                    style={{ mixBlendMode: "multiply" }}
                  />
                </g>
                <path
                  d="M714.27,610.06c-9.16-17.37-45.48-15.48-45.48-15.48s-36.31-1.89-45.47,15.48c-8.08,15.31,6.31,20.47,6.31,20.47H708S722.34,625.37,714.27,610.06Z"
                  fill="#ffea97"
                />
                <g clipPath="url(#clipPath-233)">
                  <ellipse cx="640.75" cy="608.13" rx="1.04" ry="1.93" fill="#b55243" />
                  <ellipse cx="669.1" cy="602.95" rx="1.04" ry="1.93" fill="#b55243" />
                  <ellipse cx="640.75" cy="619.56" rx="1.04" ry="1.93" fill="#b55243" />
                  <ellipse cx="697.44" cy="608.13" rx="1.04" ry="1.93" fill="#b55243" />
                  <ellipse cx="697.44" cy="619.56" rx="1.04" ry="1.93" fill="#b55243" />
                  <ellipse cx="669.1" cy="616.39" rx="1.04" ry="1.93" fill="#b55243" />
                  <path
                    d="M680.29,590.33s-36.22,9.12-35.84,25,83.23,7.47,83.23,7.47v13.26H615.42V594.52S664.49,590.33,680.29,590.33Z"
                    fill="#b55243"
                    opacity="0.2"
                    style={{ mixBlendMode: "multiply" }}
                  />
                </g>
                <rect x="625.79" y="626.87" width="86" height="14.03" fill="#ffea97" />
                <g clipPath="url(#clipPath-234)">
                  <rect x="619.89" y="639.05" width="97.8" height="4.48" fill="#4b3757" />
                  <path
                    d="M654.22,625.69s-6.58,2.68-5,7.18a5.15,5.15,0,0,0,4.82,3.23l59.54,1.14V646H622.78V624.76Z"
                    fill="#b55243"
                    opacity="0.2"
                    style={{ mixBlendMode: "multiply" }}
                  />
                </g>
                <circle cx="711.79" cy="630.53" r="10.37" fill="#ffea97" />
                <g clipPath="url(#clipPath-235)">
                  <path d="M718.75,630.53a7,7,0,1,0-7,7A7,7,0,0,0,718.75,630.53Z" fill="#b55243" />
                  <path
                    d="M716.72,620.16s-9-1.51-8.77,10.37,16.3,4.55,16.3,4.55-1.9,7.15-16.53,6.49-8.49-16.86-8.49-16.86S705.77,614.63,716.72,620.16Z"
                    fill="#b55243"
                    opacity="0.2"
                    style={{ mixBlendMode: "multiply" }}
                  />
                </g>
                <circle cx="625.79" cy="630.53" r="10.37" fill="#ffea97" />
                <g clipPath="url(#clipPath-236)">
                  <path d="M632.75,630.53a7,7,0,1,0-7,7A7,7,0,0,0,632.75,630.53Z" fill="#b55243" />
                  <path
                    d="M630.72,620.16s-9-1.51-8.77,10.37,16.3,4.55,16.3,4.55-1.9,7.15-16.53,6.49-8.49-16.86-8.49-16.86S619.77,614.63,630.72,620.16Z"
                    fill="#b55243"
                    opacity="0.2"
                    style={{ mixBlendMode: "multiply" }}
                  />
                </g>
                <path d="M744.8,614.78h-5.55v-18h5.55Z" fill="#b55243" />
                <g clipPath="url(#clipPath-237)">
                  <rect x="738.09" y="599.09" width="7.88" height="2.09" fill="#ffea97" />
                  <path
                    d="M741.28,595.55s-2,18.39,3.94,18.39v1.95h-6.45v-20Z"
                    fill="#b55243"
                    opacity="0.2"
                    style={{ mixBlendMode: "multiply" }}
                  />
                </g>
                <path
                  d="M792.82,614.78H779.7a2.65,2.65,0,0,1-2.64-2.65h0a2.64,2.64,0,0,1,2.64-2.64h13.12Z"
                  fill="#4b3757"
                />
                <g clipPath="url(#clipPath-238)">
                  <path
                    d="M788.15,608.87s-8.16-.39-9.64,1.76c-.64.94-1,3.6,1.82,3.6h13.16v1.17H776.7v-6.84Z"
                    fill="#7370bd"
                    opacity="0.2"
                    style={{ mixBlendMode: "multiply" }}
                  />
                </g>
                <path
                  d="M792.82,610.63H780.33a1.51,1.51,0,0,0-1.51,1.5h0a1.52,1.52,0,0,0,1.51,1.51h12.49Z"
                  fill="#ffe8cf"
                />
                <g clipPath="url(#clipPath-239)">
                  <path
                    d="M781.67,609.8s-2.1.83-1.71,2.33,14.46.86,14.46.86v1.24H777.94v-3.94Z"
                    fill="#b55243"
                    opacity="0.2"
                    style={{ mixBlendMode: "multiply" }}
                  />
                </g>
                <path
                  d="M792.82,609.49H779.7a2.64,2.64,0,0,1-2.64-2.64h0a2.65,2.65,0,0,1,2.64-2.65h13.12Z"
                  fill="#ffea97"
                />
                <g clipPath="url(#clipPath-240)">
                  <path
                    d="M788.15,603.58s-8.16-.39-9.64,1.76c-.64.94-1,3.61,1.82,3.61h13.16v1.16H776.7v-6.84Z"
                    fill="#7370bd"
                    opacity="0.2"
                    style={{ mixBlendMode: "multiply" }}
                  />
                </g>
                <path
                  d="M792.82,605.34H780.33a1.52,1.52,0,0,0-1.51,1.51h0a1.51,1.51,0,0,0,1.51,1.5h12.49Z"
                  fill="#ffe8cf"
                />
                <g clipPath="url(#clipPath-241)">
                  <path
                    d="M781.67,604.51s-2.1.83-1.71,2.34,14.46.85,14.46.85V609H777.94v-4Z"
                    fill="#b55243"
                    opacity="0.2"
                    style={{ mixBlendMode: "multiply" }}
                  />
                </g>
                <path d="M798.29,614.78h-5.55v-18h5.55Z" fill="#4b3757" />
                <g clipPath="url(#clipPath-242)">
                  <rect x="791.57" y="599.09" width="7.88" height="2.09" fill="#ffea97" />
                  <path
                    d="M794.77,595.55s-2,18.39,3.94,18.39v1.95h-6.46v-20Z"
                    fill="#b55243"
                    opacity="0.2"
                    style={{ mixBlendMode: "multiply" }}
                  />
                </g>
                <path d="M809,614.78h-5.55v-18H809Z" fill="#7370bd" />
                <g clipPath="url(#clipPath-243)">
                  <rect x="802.31" y="599.09" width="7.88" height="2.09" fill="#ffea97" />
                  <path
                    d="M805.51,595.55s-2,18.39,3.93,18.39v1.95H803v-20Z"
                    fill="#b55243"
                    opacity="0.2"
                    style={{ mixBlendMode: "multiply" }}
                  />
                </g>
                <path d="M815.29,614.59l-5.39.35-1.12-17.52,5.39-.34Z" fill="#ffea97" />
                <g clipPath="url(#clipPath-244)">
                  <rect
                    x="807.85"
                    y="599.53"
                    width="7.67"
                    height="2.03"
                    transform="translate(-36.68 53.04) rotate(-3.66)"
                    fill="#ffe8cf"
                  />
                  <path
                    d="M810.68,596.15s-.83,18,5,17.61l.12,1.88-6.26.4-1.24-19.4Z"
                    fill="#b55243"
                    opacity="0.2"
                    style={{ mixBlendMode: "multiply" }}
                  />
                </g>
                <path d="M803.78,614.78h-5.56V598.55h5.56Z" fill="#b55243" />
                <g clipPath="url(#clipPath-245)">
                  <rect x="797.06" y="600.67" width="7.88" height="1.88" fill="#ffe8cf" />
                  <path
                    d="M800.26,597.49s-2,16.54,3.93,16.54v1.74h-6.45v-18Z"
                    fill="#b55243"
                    opacity="0.2"
                    style={{ mixBlendMode: "multiply" }}
                  />
                </g>
                <path
                  d="M765.9,614.78H748.34a3.55,3.55,0,0,1-3.54-3.54h0a3.54,3.54,0,0,1,3.54-3.54H765.9Z"
                  fill="#4b3757"
                />
                <g clipPath="url(#clipPath-246)">
                  <path
                    d="M759.66,606.86s-10.93-.52-12.91,2.36c-.86,1.26-1.32,4.83,2.43,4.83h17.63v1.56H744.32v-9.16Z"
                    fill="#7370bd"
                    opacity="0.2"
                    style={{ mixBlendMode: "multiply" }}
                  />
                </g>
                <path d="M765.9,609.22H749.18a2,2,0,0,0-2,2h0a2,2,0,0,0,2,2H765.9Z" fill="#ffe8cf" />
                <g clipPath="url(#clipPath-247)">
                  <path
                    d="M751,608.11s-2.81,1.11-2.29,3.13,19.37,1.14,19.37,1.14v1.67H746v-5.29Z"
                    fill="#b55243"
                    opacity="0.2"
                    style={{ mixBlendMode: "multiply" }}
                  />
                </g>
                <path
                  d="M765.9,607.7H748.34a3.55,3.55,0,0,1-3.54-3.54h0a3.54,3.54,0,0,1,3.54-3.54H765.9Z"
                  fill="#d3d2ff"
                />
                <g clipPath="url(#clipPath-248)">
                  <path
                    d="M759.66,599.78s-10.93-.52-12.91,2.36c-.86,1.26-1.32,4.83,2.43,4.83h17.63v1.56H744.32v-9.16Z"
                    fill="#7370bd"
                    opacity="0.2"
                    style={{ mixBlendMode: "multiply" }}
                  />
                </g>
                <path d="M765.9,602.14H749.18a2,2,0,0,0-2,2h0a2,2,0,0,0,2,2H765.9Z" fill="#ffe8cf" />
                <g clipPath="url(#clipPath-249)">
                  <path
                    d="M751,601s-2.81,1.11-2.29,3.13,19.37,1.14,19.37,1.14V607H746v-5.28Z"
                    fill="#b55243"
                    opacity="0.2"
                    style={{ mixBlendMode: "multiply" }}
                  />
                </g>
                <path
                  d="M766,615.61V599.94a3.17,3.17,0,0,1,3.16-3.16h0a3.16,3.16,0,0,1,3.16,3.16v15.67Z"
                  fill="#ffea97"
                />
                <g clipPath="url(#clipPath-250)">
                  <path
                    d="M773,610s.47-9.76-2.1-11.52c-1.12-.77-4.31-1.18-4.31,2.17v15.72h-1.39V596.35h8.17Z"
                    fill="#7370bd"
                    opacity="0.2"
                    style={{ mixBlendMode: "multiply" }}
                  />
                </g>
                <path
                  d="M770.94,615.61V600.69a1.8,1.8,0,0,0-1.8-1.8h0a1.79,1.79,0,0,0-1.79,1.8v14.92Z"
                  fill="#ffe8cf"
                />
                <g clipPath="url(#clipPath-251)">
                  <path
                    d="M771.93,602.3s-1-2.51-2.79-2-1,17.28-1,17.28h-1.49V597.84h4.72Z"
                    fill="#b55243"
                    opacity="0.2"
                    style={{ mixBlendMode: "multiply" }}
                  />
                </g>
                <path
                  d="M772.3,615.61V603.32a2.48,2.48,0,0,1,2.48-2.48h0a2.48,2.48,0,0,1,2.47,2.48v12.29Z"
                  fill="#7370bd"
                />
                <g clipPath="url(#clipPath-252)">
                  <path
                    d="M777.84,611.24s.36-7.65-1.65-9c-.88-.6-3.38-.92-3.38,1.7v12.34h-1.09V600.5h6.41Z"
                    fill="#7370bd"
                    opacity="0.2"
                    style={{ mixBlendMode: "multiply" }}
                  />
                </g>
                <path
                  d="M776.19,615.61V603.9a1.41,1.41,0,0,0-1.41-1.4h0a1.41,1.41,0,0,0-1.41,1.4v11.71Z"
                  fill="#ffe8cf"
                />
                <g clipPath="url(#clipPath-253)">
                  <path
                    d="M777,605.17s-.78-2-2.18-1.61-.8,13.55-.8,13.55h-1.17V601.67h3.7Z"
                    fill="#b55243"
                    opacity="0.2"
                    style={{ mixBlendMode: "multiply" }}
                  />
                </g>
                <rect x="736.82" y="614.78" width="80.79" height="2.08" fill="#4b3757" />
                <g clipPath="url(#clipPath-254)">
                  <path
                    d="M763.82,614.22s18,2.78,58.06,2.29v1.32H736.82l-2-3.12,1.32-.66Z"
                    fill="#b55243"
                    opacity="0.2"
                    style={{ mixBlendMode: "multiply" }}
                  />
                </g>
                <path d="M744.8,591.41h-5.55v-18h5.55Z" fill="#7370bd" />
                <g clipPath="url(#clipPath-255)">
                  <rect x="738.09" y="575.72" width="7.88" height="2.09" fill="#ffea97" />
                  <path
                    d="M741.28,572.18s-2,18.39,3.94,18.39v1.95h-6.45v-20Z"
                    fill="#b55243"
                    opacity="0.2"
                    style={{ mixBlendMode: "multiply" }}
                  />
                </g>
                <path
                  d="M785.79,585.11h17.44a0,0,0,0,1,0,0v6.3a0,0,0,0,1,0,0H785.79a1.32,1.32,0,0,1-1.32-1.32v-3.65A1.32,1.32,0,0,1,785.79,585.11Z"
                  fill="#4b3757"
                />
                <g clipPath="url(#clipPath-256)">
                  <path
                    d="M797.68,584.37s-9.72-.46-11.48,2.1c-.77,1.12-1.17,4.29,2.16,4.29H804v1.39H784V584Z"
                    fill="#7370bd"
                    opacity="0.2"
                    style={{ mixBlendMode: "multiply" }}
                  />
                </g>
                <path
                  d="M803.24,586.47H788.36a1.79,1.79,0,0,0-1.79,1.79h0a1.79,1.79,0,0,0,1.79,1.79h14.88Z"
                  fill="#ffe8cf"
                />
                <g clipPath="url(#clipPath-257)">
                  <path
                    d="M790,585.48s-2.5,1-2,2.78,17.22,1,17.22,1v1.48H785.52v-4.7Z"
                    fill="#b55243"
                    opacity="0.2"
                    style={{ mixBlendMode: "multiply" }}
                  />
                </g>
                <path
                  d="M785.79,578.82h17.44a0,0,0,0,1,0,0v6.3a0,0,0,0,1,0,0H785.79a1.32,1.32,0,0,1-1.32-1.32v-3.65A1.32,1.32,0,0,1,785.79,578.82Z"
                  fill="#ffea97"
                />
                <g clipPath="url(#clipPath-258)">
                  <path
                    d="M797.68,578.08s-9.72-.47-11.48,2.09c-.77,1.12-1.17,4.29,2.16,4.29H804v1.39H784V577.7Z"
                    fill="#7370bd"
                    opacity="0.2"
                    style={{ mixBlendMode: "multiply" }}
                  />
                </g>
                <path
                  d="M803.24,580.17H788.36a1.79,1.79,0,0,0-1.79,1.79h0a1.79,1.79,0,0,0,1.79,1.79h14.88Z"
                  fill="#ffe8cf"
                />
                <g clipPath="url(#clipPath-259)">
                  <path
                    d="M790,579.19s-2.5,1-2,2.77,17.22,1,17.22,1v1.48H785.52v-4.69Z"
                    fill="#b55243"
                    opacity="0.2"
                    style={{ mixBlendMode: "multiply" }}
                  />
                </g>
                <path d="M761.34,591.41h-5.55v-18h5.55Z" fill="#4b3757" />
                <g clipPath="url(#clipPath-260)">
                  <rect x="754.63" y="575.72" width="7.88" height="2.09" fill="#ffea97" />
                  <path
                    d="M757.82,572.18s-2,18.39,3.94,18.39v1.95h-6.45v-20Z"
                    fill="#b55243"
                    opacity="0.2"
                    style={{ mixBlendMode: "multiply" }}
                  />
                </g>
                <path d="M808.71,591.41h-5.55v-18h5.55Z" fill="#4b3757" />
                <g clipPath="url(#clipPath-261)">
                  <rect x="802" y="575.72" width="7.88" height="2.09" fill="#ffea97" />
                  <path
                    d="M805.19,572.18s-2,18.39,3.94,18.39v1.95h-6.46v-20Z"
                    fill="#b55243"
                    opacity="0.2"
                    style={{ mixBlendMode: "multiply" }}
                  />
                </g>
                <path d="M816.19,590.89l-5.48.83L808,573.88l5.49-.83Z" fill="#7370bd" />
                <g clipPath="url(#clipPath-262)">
                  <rect
                    x="807.31"
                    y="575.78"
                    width="7.88"
                    height="2.09"
                    transform="translate(-77.46 128.43) rotate(-8.64)"
                    fill="#ffea97"
                  />
                  <path
                    d="M809.82,572.41s.76,18.49,6.66,17.59l.29,1.92-6.38,1-3-19.76Z"
                    fill="#b55243"
                    opacity="0.2"
                    style={{ mixBlendMode: "multiply" }}
                  />
                </g>
                <path d="M784.64,585.82v5.56h-18v-5.56Z" fill="#4b3757" />
                <g clipPath="url(#clipPath-263)">
                  <rect
                    x="766.06"
                    y="587.55"
                    width="7.88"
                    height="2.09"
                    transform="translate(181.4 1358.6) rotate(-90)"
                    fill="#ffea97"
                  />
                  <path
                    d="M765.42,589.34s18.39,2,18.39-3.93h1.94v6.45h-20Z"
                    fill="#b55243"
                    opacity="0.2"
                    style={{ mixBlendMode: "multiply" }}
                  />
                </g>
                <path d="M784.64,580.27v5.55h-18v-5.55Z" fill="#7370bd" />
                <g clipPath="url(#clipPath-264)">
                  <rect
                    x="766.06"
                    y="582"
                    width="7.88"
                    height="2.09"
                    transform="translate(186.95 1353.05) rotate(-90)"
                    fill="#ffea97"
                  />
                  <path
                    d="M765.42,583.79s18.39,2,18.39-3.94h1.94v6.46h-20Z"
                    fill="#b55243"
                    opacity="0.2"
                    style={{ mixBlendMode: "multiply" }}
                  />
                </g>
                <path d="M784.64,574.72v5.55h-18v-5.55Z" fill="#b55243" />
                <g clipPath="url(#clipPath-265)">
                  <rect
                    x="766.06"
                    y="576.45"
                    width="7.88"
                    height="2.09"
                    transform="translate(192.51 1347.49) rotate(-90)"
                    fill="#ffea97"
                  />
                  <path
                    d="M765.42,578.24s18.39,2,18.39-3.94h1.94v6.46h-20Z"
                    fill="#b55243"
                    opacity="0.2"
                    style={{ mixBlendMode: "multiply" }}
                  />
                </g>
                <path d="M766.83,591.41h-5.55V575.18h5.55Z" fill="#7370bd" />
                <g clipPath="url(#clipPath-266)">
                  <rect x="760.11" y="577.3" width="7.88" height="1.88" fill="#ffea97" />
                  <path
                    d="M763.31,574.12s-2,16.54,3.94,16.54v1.75h-6.46v-18Z"
                    fill="#b55243"
                    opacity="0.2"
                    style={{ mixBlendMode: "multiply" }}
                  />
                </g>
                <path
                  d="M744.51,592.24V576.57a3.15,3.15,0,0,1,3.16-3.15h0a3.16,3.16,0,0,1,3.16,3.15v15.67Z"
                  fill="#ffea97"
                />
                <g clipPath="url(#clipPath-267)">
                  <path
                    d="M751.57,586.67s.46-9.76-2.11-11.52c-1.12-.77-4.3-1.18-4.3,2.17v15.73h-1.39V573h8.17Z"
                    fill="#7370bd"
                    opacity="0.2"
                    style={{ mixBlendMode: "multiply" }}
                  />
                </g>
                <path
                  d="M749.46,592.24V577.32a1.8,1.8,0,0,0-1.79-1.8h0a1.81,1.81,0,0,0-1.8,1.8v14.92Z"
                  fill="#ffe8cf"
                />
                <g clipPath="url(#clipPath-268)">
                  <path
                    d="M750.45,578.93s-1-2.51-2.78-2-1,17.28-1,17.28h-1.49V574.47h4.71Z"
                    fill="#b55243"
                    opacity="0.2"
                    style={{ mixBlendMode: "multiply" }}
                  />
                </g>
                <path
                  d="M750.83,592.24V580a2.47,2.47,0,0,1,2.47-2.47h0a2.48,2.48,0,0,1,2.48,2.47v12.29Z"
                  fill="#7370bd"
                />
                <g clipPath="url(#clipPath-269)">
                  <path
                    d="M756.36,587.87s.37-7.65-1.65-9c-.88-.61-3.37-.93-3.37,1.7v12.33h-1.1V577.14h6.41Z"
                    fill="#7370bd"
                    opacity="0.2"
                    style={{ mixBlendMode: "multiply" }}
                  />
                </g>
                <path
                  d="M754.71,592.24v-11.7a1.41,1.41,0,0,0-1.41-1.41h0a1.41,1.41,0,0,0-1.41,1.41v11.7Z"
                  fill="#ffe8cf"
                />
                <g clipPath="url(#clipPath-270)">
                  <path
                    d="M755.49,581.8s-.78-2-2.19-1.6-.8,13.55-.8,13.55h-1.16V578.3H755Z"
                    fill="#b55243"
                    opacity="0.2"
                    style={{ mixBlendMode: "multiply" }}
                  />
                </g>
                <rect x="736.82" y="591.41" width="80.79" height="2.08" fill="#4b3757" />
                <g clipPath="url(#clipPath-271)">
                  <path
                    d="M763.82,590.85s18,2.78,58.06,2.29v1.32H736.82l-2-3.12,1.32-.66Z"
                    fill="#b55243"
                    opacity="0.2"
                    style={{ mixBlendMode: "multiply" }}
                  />
                </g>
                <path d="M744.8,568h-5.55V550h5.55Z" fill="#b55243" />
                <g clipPath="url(#clipPath-272)">
                  <rect x="738.09" y="552.35" width="7.88" height="2.09" fill="#ffea97" />
                  <path
                    d="M741.28,548.81s-2,18.4,3.94,18.4v1.94h-6.45v-20Z"
                    fill="#b55243"
                    opacity="0.2"
                    style={{ mixBlendMode: "multiply" }}
                  />
                </g>
                <path d="M749.35,568h-4.57V553.17h4.57Z" fill="#7370bd" />
                <g clipPath="url(#clipPath-273)">
                  <rect x="743.82" y="555.11" width="6.5" height="1.72" fill="#ffea97" />
                  <path
                    d="M746.45,552.19s-1.67,15.16,3.25,15.16V569h-5.32V552.48Z"
                    fill="#b55243"
                    opacity="0.2"
                    style={{ mixBlendMode: "multiply" }}
                  />
                </g>
                <path d="M753.91,568h-4.58V553.17h4.58Z" fill="#4b3757" />
                <g clipPath="url(#clipPath-274)">
                  <rect x="748.37" y="555.11" width="6.5" height="1.72" fill="#ffea97" />
                  <path
                    d="M751,552.19s-1.68,15.16,3.24,15.16V569h-5.32V552.48Z"
                    fill="#b55243"
                    opacity="0.2"
                    style={{ mixBlendMode: "multiply" }}
                  />
                </g>
                <path d="M758.46,568h-4.57V551.82h4.57Z" fill="#7370bd" />
                <g clipPath="url(#clipPath-275)">
                  <rect x="752.93" y="555.11" width="6.5" height="1.72" fill="#ffea97" />
                  <path
                    d="M755.56,552.19s-1.67,15.16,3.25,15.16V569h-5.32V552.48Z"
                    fill="#b55243"
                    opacity="0.2"
                    style={{ mixBlendMode: "multiply" }}
                  />
                </g>
                <path d="M766.69,567.22l-4.43,1.16L758.5,554l4.43-1.16Z" fill="#b55243" />
                <g clipPath="url(#clipPath-276)">
                  <rect
                    x="758.18"
                    y="555.26"
                    width="6.5"
                    height="1.72"
                    transform="matrix(0.97, -0.25, 0.25, 0.97, -115.92, 210.73)"
                    fill="#ffea97"
                  />
                  <path
                    d="M759.87,552.62s2.22,15.09,7,13.85l.4,1.55-5.14,1.34-4.17-15.94Z"
                    fill="#b55243"
                    opacity="0.2"
                    style={{ mixBlendMode: "multiply" }}
                  />
                </g>
                <path d="M814.59,568H809V550h5.55Z" fill="#d3d2ff" />
                <g clipPath="url(#clipPath-277)">
                  <rect x="807.88" y="552.35" width="7.88" height="2.09" fill="#ffea97" />
                  <path
                    d="M811.07,548.81s-2,18.4,3.94,18.4v1.94h-6.45v-20Z"
                    fill="#b55243"
                    opacity="0.2"
                    style={{ mixBlendMode: "multiply" }}
                  />
                </g>
                <path
                  d="M803.24,568H790.13a2.65,2.65,0,0,1-2.65-2.64h0a2.65,2.65,0,0,1,2.65-2.65h13.11Z"
                  fill="#4b3757"
                />
                <g clipPath="url(#clipPath-278)">
                  <path
                    d="M798.57,562.13s-8.16-.39-9.64,1.76c-.64.94-1,3.61,1.82,3.61h13.16v1.16H787.12v-6.84Z"
                    fill="#7370bd"
                    opacity="0.2"
                    style={{ mixBlendMode: "multiply" }}
                  />
                </g>
                <path
                  d="M803.24,563.89H790.75a1.52,1.52,0,0,0-1.51,1.51h0a1.51,1.51,0,0,0,1.51,1.5h12.49Z"
                  fill="#ffe8cf"
                />
                <g clipPath="url(#clipPath-279)">
                  <path
                    d="M792.09,563.06s-2.09.83-1.71,2.34,14.46.85,14.46.85v1.25H788.36v-4Z"
                    fill="#b55243"
                    opacity="0.2"
                    style={{ mixBlendMode: "multiply" }}
                  />
                </g>
                <path
                  d="M803.24,562.75H790.13a2.65,2.65,0,0,1-2.65-2.64h0a2.65,2.65,0,0,1,2.65-2.64h13.11Z"
                  fill="#ffea97"
                />
                <g clipPath="url(#clipPath-280)">
                  <path
                    d="M798.57,556.84s-8.16-.38-9.64,1.77c-.64.93-1,3.6,1.82,3.6h13.16v1.16H787.12v-6.84Z"
                    fill="#7370bd"
                    opacity="0.2"
                    style={{ mixBlendMode: "multiply" }}
                  />
                </g>
                <path
                  d="M803.24,558.61H790.75a1.51,1.51,0,0,0-1.51,1.5h0a1.51,1.51,0,0,0,1.51,1.5h12.49Z"
                  fill="#ffe8cf"
                />
                <g clipPath="url(#clipPath-281)">
                  <path
                    d="M792.09,557.78s-2.09.83-1.71,2.33,14.46.85,14.46.85v1.25H788.36v-4Z"
                    fill="#b55243"
                    opacity="0.2"
                    style={{ mixBlendMode: "multiply" }}
                  />
                </g>
                <path d="M782.82,568h-5.55V550h5.55Z" fill="#4b3757" />
                <g clipPath="url(#clipPath-282)">
                  <rect x="776.1" y="552.35" width="7.88" height="2.09" fill="#ffea97" />
                  <path
                    d="M779.3,548.81s-2,18.4,3.93,18.4v1.94h-6.45v-20Z"
                    fill="#b55243"
                    opacity="0.2"
                    style={{ mixBlendMode: "multiply" }}
                  />
                </g>
                <path d="M788.3,568h-5.55V551.82h5.55Z" fill="#b55243" />
                <g clipPath="url(#clipPath-283)">
                  <rect x="781.59" y="553.93" width="7.88" height="1.88" fill="#ffea97" />
                  <path
                    d="M784.78,550.75s-2,16.54,3.94,16.54V569h-6.45v-18Z"
                    fill="#b55243"
                    opacity="0.2"
                    style={{ mixBlendMode: "multiply" }}
                  />
                </g>
                <path d="M809.89,567.49l-5.49.87-2.83-17.82,5.49-.87Z" fill="#7370bd" />
                <g clipPath="url(#clipPath-284)">
                  <rect
                    x="800.91"
                    y="552.42"
                    width="7.88"
                    height="2.09"
                    transform="translate(-76.87 133.13) rotate(-9.03)"
                    fill="#ffea97"
                  />
                  <path
                    d="M803.39,549.06s.88,18.48,6.78,17.54l.3,1.92-6.37,1L801,549.79Z"
                    fill="#b55243"
                    opacity="0.2"
                    style={{ mixBlendMode: "multiply" }}
                  />
                </g>
                <path
                  d="M766,568.87V553.21a3.16,3.16,0,0,1,3.16-3.16h0a3.15,3.15,0,0,1,3.16,3.16v15.66Z"
                  fill="#ffea97"
                />
                <g clipPath="url(#clipPath-285)">
                  <path
                    d="M773,563.3s.47-9.75-2.1-11.52c-1.12-.77-4.31-1.17-4.31,2.17v15.73h-1.39V549.61h8.17Z"
                    fill="#7370bd"
                    opacity="0.2"
                    style={{ mixBlendMode: "multiply" }}
                  />
                </g>
                <path d="M770.94,568.87V554a1.81,1.81,0,0,0-1.8-1.8h0a1.8,1.8,0,0,0-1.79,1.8v14.92Z" fill="#ffe8cf" />
                <g clipPath="url(#clipPath-286)">
                  <path
                    d="M771.93,555.56s-1-2.51-2.79-2-1,17.27-1,17.27h-1.49V551.1h4.72Z"
                    fill="#b55243"
                    opacity="0.2"
                    style={{ mixBlendMode: "multiply" }}
                  />
                </g>
                <path
                  d="M772.3,568.87V556.58a2.48,2.48,0,0,1,2.48-2.47h0a2.48,2.48,0,0,1,2.47,2.47v12.29Z"
                  fill="#7370bd"
                />
                <g clipPath="url(#clipPath-287)">
                  <path
                    d="M777.84,564.5s.36-7.65-1.65-9c-.88-.61-3.38-.92-3.38,1.7V569.5h-1.09V553.77h6.41Z"
                    fill="#7370bd"
                    opacity="0.2"
                    style={{ mixBlendMode: "multiply" }}
                  />
                </g>
                <path
                  d="M776.19,568.87v-11.7a1.41,1.41,0,0,0-1.41-1.41h0a1.41,1.41,0,0,0-1.41,1.41v11.7Z"
                  fill="#ffe8cf"
                />
                <g clipPath="url(#clipPath-288)">
                  <path
                    d="M777,558.43s-.78-2-2.18-1.6-.8,13.55-.8,13.55h-1.17V554.93h3.7Z"
                    fill="#b55243"
                    opacity="0.2"
                    style={{ mixBlendMode: "multiply" }}
                  />
                </g>
                <rect x="736.82" y="568.04" width="80.79" height="2.08" fill="#4b3757" />
                <g clipPath="url(#clipPath-289)">
                  <path
                    d="M763.82,567.48s18,2.78,58.06,2.29v1.32H736.82l-2-3.12,1.32-.66Z"
                    fill="#b55243"
                    opacity="0.2"
                    style={{ mixBlendMode: "multiply" }}
                  />
                </g>
                <rect x="736.82" y="546.59" width="80.79" height="2.08" fill="#4b3757" />
                <g clipPath="url(#clipPath-290)">
                  <path
                    d="M763.82,546s18,2.78,58.06,2.29v1.32H736.82l-2-3.12,1.32-.66Z"
                    fill="#b55243"
                    opacity="0.2"
                    style={{ mixBlendMode: "multiply" }}
                  />
                </g>
                <rect
                  x="696.5"
                  y="586.05"
                  width="81.02"
                  height="2.08"
                  transform="translate(1324.1 -149.91) rotate(90)"
                  fill="#4b3757"
                />
                <g clipPath="url(#clipPath-291)">
                  <path
                    d="M738.6,573.66s-2.77,18-2.29,58.22H735V546.59l3.13-2,.66,1.32Z"
                    fill="#b55243"
                    opacity="0.2"
                    style={{ mixBlendMode: "multiply" }}
                  />
                </g>
                <rect
                  x="776.08"
                  y="586.05"
                  width="81.02"
                  height="2.08"
                  transform="translate(1403.68 -229.49) rotate(90)"
                  fill="#4b3757"
                />
                <g clipPath="url(#clipPath-292)">
                  <path
                    d="M818.18,573.66s-2.77,18-2.29,58.22h-1.32V546.59l3.13-2,.66,1.32Z"
                    fill="#b55243"
                    opacity="0.2"
                    style={{ mixBlendMode: "multiply" }}
                  />
                </g>
                <rect x="734.26" y="624.91" width="84.79" height="2.8" fill="#4b3757" />
                <g clipPath="url(#clipPath-293)">
                  <path
                    d="M743,621.76s15.44,6,77.44,5.28l1.16,1.16H732.69v-7.32Z"
                    fill="#4b3757"
                    opacity="0.2"
                    style={{ mixBlendMode: "multiply" }}
                  />
                </g>
                <rect x="738.74" y="627.71" width="75.82" height="8.6" fill="#4b3757" />
                <g clipPath="url(#clipPath-294)">
                  <path
                    d="M749.83,626.31s15.16,10,67.65,10-5.6,7.14-5.6,7.14H734.26V624.91Z"
                    fill="#4b3757"
                    opacity="0.2"
                    style={{ mixBlendMode: "multiply" }}
                  />
                </g>
                <rect x="735.84" y="627.71" width="2.91" height="24.84" fill="#4b3757" />
                <g clipPath="url(#clipPath-295)">
                  <path
                    d="M739.8,629.46s-2.34,0-2.51,3.67-1,21.17-1,21.17h-2V627.12H741Z"
                    fill="#4b3757"
                    opacity="0.2"
                    style={{ mixBlendMode: "multiply" }}
                  />
                </g>
                <rect x="771.73" y="630.86" width="12.95" height="2.27" fill="#fff" />
                <rect x="814.57" y="627.71" width="2.91" height="24.84" fill="#4b3757" />
                <g clipPath="url(#clipPath-296)">
                  <path
                    d="M818.53,629.46s-2.34,0-2.51,3.67l-1,21.17h-2V627.12h6.71Z"
                    fill="#4b3757"
                    opacity="0.2"
                    style={{ mixBlendMode: "multiply" }}
                  />
                </g>
                <polygon
                  points="656.27 528.12 605.72 643.53 732.48 643.53 681.92 528.12 656.27 528.12"
                  fill="url(#Degradado_sin_nombre_3-17)"
                  style={{ mixBlendMode: "overlay" }}
                />
                <rect
                  id="LivingRoom_Dark"
                  style={{ display: this.state.rooms.find((r) => r.Name === "LivingRoom").displayStyle }}
                  x="594.95"
                  y="525.09"
                  width="228.73"
                  height="133.17"
                  opacity="0.9"
                />
              </g>
              <path
                d="M1047.35,650.66V784.55H828.73V380.34H818.62V520.55H680V375.29h-10.1V520.55H517.1V375.29H507V520.55H261.1V380.34H251V921H600V794.66h457.46v-144Zm-228.73-120V652.55H600V530.66Zm-228.73,0V652.55H383.2V530.66Zm0,132V784.55H421.1V662.66Zm-328.79-132h112V652.55h-112Zm0,132H411V784.55H261.1ZM589.89,910.87H261.1V794.66H589.89ZM600,784.55V662.66H818.62V784.55Z"
                fill="#4b3757"
              />
              <path
                d="M1047.35,650.66V784.55H828.73V380.34H818.62V520.55H680V375.29h-10.1V520.55H517.1V375.29H507V520.55H261.1V380.34H251V921H600V794.66h457.46v-144Zm-228.73-120V652.55H600V530.66Zm-228.73,0V652.55H383.2V530.66Zm0,132V784.55H421.1V662.66Zm-328.79-132h112V652.55h-112Zm0,132H411V784.55H261.1ZM589.89,910.87H261.1V794.66H589.89ZM600,784.55V662.66H818.62V784.55Z"
                fill="#4b3757"
              />
              <g opacity="0.2" style={{ mixBlendMode: "multiply" }}>
                <polygon
                  points="416.04 784.55 416.04 660.12 261.1 660.12 261.1 662.66 410.99 662.66 410.99 784.55 416.04 784.55"
                  fill="#7370bd"
                />
                <polygon
                  points="594.95 910.87 594.95 792.12 261.1 792.12 261.1 794.66 589.89 794.66 589.89 910.87 594.95 910.87"
                  fill="#7370bd"
                />
                <polygon
                  points="594.95 660.12 421.1 660.12 421.1 662.66 589.89 662.66 589.89 784.55 594.95 784.55 594.95 660.12"
                  fill="#7370bd"
                />
                <polygon
                  points="373.1 652.55 378.15 652.55 378.15 528.12 261.1 528.12 261.1 530.66 373.1 530.66 373.1 652.55"
                  fill="#7370bd"
                />
                <rect x="1047.35" y="650.66" width="5.05" height="133.89" fill="#7370bd" />
                <rect x="818.62" y="380.34" width="5.05" height="140.21" fill="#7370bd" />
                <polygon
                  points="823.68 528.12 600 528.12 600 530.66 818.62 530.66 818.62 652.55 823.68 652.55 823.68 528.12"
                  fill="#7370bd"
                />
                <polygon
                  points="594.95 918.43 266.15 918.43 261.1 918.43 256.04 918.43 256.04 792.12 256.04 782.01 256.04 660.12 256.04 650.01 256.04 528.12 256.04 518.01 256.04 380.34 250.99 380.34 250.99 520.55 250.99 530.66 250.99 652.55 250.99 662.66 250.99 784.55 250.99 794.66 250.99 920.97 256.04 920.97 261.1 920.97 589.89 920.97 600 920.97 600 918.43 594.95 918.43"
                  fill="#7370bd"
                />
                <rect x="506.99" y="375.29" width="5.05" height="145.26" fill="#7370bd" />
                <polygon
                  points="1052.4 792.12 833.78 792.12 823.68 792.12 600 792.12 600 794.66 818.62 794.66 828.73 794.66 1047.35 794.66 1057.46 794.66 1057.46 792.12 1052.4 792.12"
                  fill="#7370bd"
                />
                <polygon
                  points="823.68 784.55 823.68 660.12 600 660.12 600 662.66 818.62 662.66 818.62 784.55 823.68 784.55"
                  fill="#7370bd"
                />
                <rect x="669.94" y="375.29" width="5.05" height="145.26" fill="#7370bd" />
                <polygon
                  points="594.95 528.12 383.2 528.12 383.2 530.66 589.89 530.66 589.89 652.55 594.95 652.55 594.95 528.12"
                  fill="#7370bd"
                />
              </g>
              <rect
                x="948.16"
                y="533.12"
                width="10.11"
                height="248.97"
                transform="translate(295.61 1610.82) rotate(-90)"
                fill="#0f001f"
                style={{ mixBlendMode: "multiply" }}
              />
              <polygon
                points="1057.81 543.29 828.73 543.29 828.73 652.55 1077.7 652.55 1057.81 543.29"
                fill="#7370bd"
              />
              <g clipPath="url(#clipPath-297)">
                <path
                  d="M900.94,525.61s-36.06,17.68-23.42,72.31S1116.72,648,1116.72,648v22.06H813.1v-137Z"
                  fill="#7370bd"
                  opacity="0.2"
                  style={{ mixBlendMode: "multiply" }}
                />
                <path
                  d="M925.52,525.61s-31.83,45.24,34.93,76,129,15.83,129,15.83V532.08Z"
                  fill="#fff"
                  opacity="0.1"
                  style={{ mixBlendMode: "overlay" }}
                />
                <rect
                  x="577.12"
                  y="550.25"
                  width="544.99"
                  height="2.89"
                  fill="#7370bd"
                  opacity="0.2"
                  style={{ mixBlendMode: "multiply" }}
                />
                <rect
                  x="577.12"
                  y="560.62"
                  width="544.99"
                  height="2.89"
                  fill="#7370bd"
                  opacity="0.2"
                  style={{ mixBlendMode: "multiply" }}
                />
                <rect
                  x="577.12"
                  y="570.98"
                  width="544.99"
                  height="2.89"
                  fill="#7370bd"
                  opacity="0.2"
                  style={{ mixBlendMode: "multiply" }}
                />
                <rect
                  x="577.12"
                  y="581.35"
                  width="544.99"
                  height="2.89"
                  fill="#7370bd"
                  opacity="0.2"
                  style={{ mixBlendMode: "multiply" }}
                />
                <rect
                  x="577.12"
                  y="591.71"
                  width="544.99"
                  height="2.89"
                  fill="#7370bd"
                  opacity="0.2"
                  style={{ mixBlendMode: "multiply" }}
                />
                <rect
                  x="577.12"
                  y="602.07"
                  width="544.99"
                  height="2.89"
                  fill="#7370bd"
                  opacity="0.2"
                  style={{ mixBlendMode: "multiply" }}
                />
                <rect
                  x="577.12"
                  y="612.44"
                  width="544.99"
                  height="2.89"
                  fill="#7370bd"
                  opacity="0.2"
                  style={{ mixBlendMode: "multiply" }}
                />
                <rect
                  x="577.12"
                  y="622.8"
                  width="544.99"
                  height="2.89"
                  fill="#7370bd"
                  opacity="0.2"
                  style={{ mixBlendMode: "multiply" }}
                />
                <rect
                  x="577.12"
                  y="633.16"
                  width="544.99"
                  height="2.89"
                  fill="#7370bd"
                  opacity="0.2"
                  style={{ mixBlendMode: "multiply" }}
                />
                <rect
                  x="577.12"
                  y="643.53"
                  width="544.99"
                  height="2.89"
                  fill="#7370bd"
                  opacity="0.2"
                  style={{ mixBlendMode: "multiply" }}
                />
              </g>
              <rect
                x="534.81"
                y="50.29"
                width="10.11"
                height="650"
                transform="translate(164.57 915.15) rotate(-90)"
                fill="#0f001f"
                style={{ mixBlendMode: "multiply" }}
              />
              <polygon points="819.15 189.74 260.56 189.74 214.86 370.24 864.86 370.24 819.15 189.74" fill="#7370bd" />
              <g clipPath="url(#clipPath-298)">
                <path
                  d="M378.15,144.13s-.49.39-1.39,1.15c-70.26,59.25-38.68,173.85,52,189,168.36,28.13,482.9,36,482.9,36v10.1H188.92L251,154.25Z"
                  fill="#7370bd"
                  opacity="0.76"
                  style={{ mixBlendMode: "multiply" }}
                />
                <path
                  d="M411,172.29s30.77,107.79,195,128.47C766.36,321,882.57,328.19,882.57,328.19l-53.05-149Z"
                  fill="#fff"
                  opacity="0.14"
                  style={{ mixBlendMode: "overlay" }}
                />
                <rect
                  x="154.82"
                  y="202.24"
                  width="774.48"
                  height="4.68"
                  fill="#7370bd"
                  opacity="0.2"
                  style={{ mixBlendMode: "multiply" }}
                />
                <rect
                  x="154.82"
                  y="219.03"
                  width="774.48"
                  height="4.68"
                  fill="#7370bd"
                  opacity="0.2"
                  style={{ mixBlendMode: "multiply" }}
                />
                <rect
                  x="154.82"
                  y="235.82"
                  width="774.48"
                  height="4.68"
                  fill="#7370bd"
                  opacity="0.2"
                  style={{ mixBlendMode: "multiply" }}
                />
                <rect
                  x="154.82"
                  y="252.61"
                  width="774.48"
                  height="4.68"
                  fill="#7370bd"
                  opacity="0.2"
                  style={{ mixBlendMode: "multiply" }}
                />
                <rect
                  x="154.82"
                  y="269.4"
                  width="774.48"
                  height="4.68"
                  fill="#7370bd"
                  opacity="0.2"
                  style={{ mixBlendMode: "multiply" }}
                />
                <rect
                  x="154.82"
                  y="286.19"
                  width="774.48"
                  height="4.68"
                  fill="#7370bd"
                  opacity="0.2"
                  style={{ mixBlendMode: "multiply" }}
                />
                <rect
                  x="154.82"
                  y="302.98"
                  width="774.48"
                  height="4.68"
                  fill="#7370bd"
                  opacity="0.2"
                  style={{ mixBlendMode: "multiply" }}
                />
                <rect
                  x="154.82"
                  y="319.77"
                  width="774.48"
                  height="4.68"
                  fill="#7370bd"
                  opacity="0.2"
                  style={{ mixBlendMode: "multiply" }}
                />
                <rect
                  x="154.82"
                  y="336.56"
                  width="774.48"
                  height="4.68"
                  fill="#7370bd"
                  opacity="0.2"
                  style={{ mixBlendMode: "multiply" }}
                />
                <rect
                  x="154.82"
                  y="353.35"
                  width="774.48"
                  height="4.68"
                  fill="#7370bd"
                  opacity="0.2"
                  style={{ mixBlendMode: "multiply" }}
                />
              </g>
            </g>
          </g>
        </svg>

        <form id="connection-information-form">
          <input type="button" onClick={() => this.startConnect()} value="Connect" />
          <input type="button" onClick={() => this.startDisconnect()} value="Disconnect" />
        </form>
        <div id="messages">
          {this.state.messages.map((m, i) => (
            <p key={i}>{m}</p>
          ))}
        </div>
      </div>
    );
  }
}

export default App;
