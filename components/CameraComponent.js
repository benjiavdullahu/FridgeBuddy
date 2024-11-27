/*
StAuth10244: I Benjamin Avdullahu, 000876877 certify that this material is my original work.
 No other person's work has been used without due acknowledgement. I have not made my work available to anyone else."
*/
import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, StyleSheet, Image, Text } from "react-native";
import { Camera } from "expo-camera";
import cameraIcon from "./images/CameraIcon.png";

const CameraComponent = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [camera, setCamera] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const takePicture = async () => {
    if (camera) {
      const data = await camera.takePictureAsync();
      navigation.navigate("ItemForm", { imageUri: data.uri });
    }
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return (
      <View>
        <Text>No access to camera</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Camera
        style={styles.camera}
        type={Camera.Constants.Type.back}
        ref={setCamera}
      >
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.cameraButton} onPress={takePicture}>
            <Image source={cameraIcon} style={styles.icon} />
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: 60,
  },
  cameraButton: {
    width: 80,
    height: 80,
  },
  icon: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
});

export default CameraComponent;
