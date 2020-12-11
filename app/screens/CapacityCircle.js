import React from "react";
import { View, StyleSheet, Text } from "react-native";
/**
 * Override styles that get passed from props
 **/
propStyle = (percent, base_degrees) => {
  const rotateBy = base_degrees + percent * 3.6;
  return {
    transform: [{ rotateZ: `${rotateBy}deg` }],
  };
};

renderThirdLayer = (percent) => {
  if (percent > 50) {
    /**
     * Third layer circle default is 45 degrees, so by default it occupies the right half semicircle.
     * Since first 50 percent is already taken care  by second layer circle, hence we subtract it
     * before passing to the propStyle function
     **/
    return (
      <View
        style={[styles.secondProgressLayer, propStyle(percent - 50, 45)]}
      ></View>
    );
  } else {
    return <View style={styles.offsetLayer}></View>;
  }
};

const CapacityCircle = (percent) => {
  //let percent = Number(percentStr);
  //console.log("THIS IS THE CAPACITY CIRCLE PERCENT: ", percent);
  let firstProgressLayerStyle;
  if (percent > 50) {
    firstProgressLayerStyle = propStyle(50, -135);
  } else {
    firstProgressLayerStyle = propStyle(percent, -135);
  }

  return (
    <View style={styles.container}>
      <View style={[styles.firstProgressLayer, firstProgressLayerStyle]}></View>
      {renderThirdLayer(percent)}
      <Text style={styles.display}>{percent}%</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 50,
    height: 50,
    borderWidth: 10,
    borderRadius: 100,
    borderColor: "grey",
    justifyContent: "center",
    alignItems: "center",
  },
  firstprogressLayer: {
    width: 50,
    height: 50,
    borderWidth: 10,
    borderRadius: 100,
    position: "absolute",
    borderLeftColor: "transparent",
    borderBottomColor: "transparent",
    borderRightColor: "#3498db",
    borderTopColor: "#3498db",
    //transform: [{ rotateZ: "-135deg" }],
  },
  secondProgressLayer: {
    width: 50,
    height: 50,
    position: "absolute",
    borderWidth: 10,
    borderRadius: 100,
    borderLeftColor: "transparent",
    borderBottomColor: "transparent",
    borderRightColor: "#3498db",
    borderTopColor: "#3498db",
    //transform: [{ rotateZ: "45deg" }],
  },
  offsetLayer: {
    width: 50,
    height: 50,
    position: "absolute",
    borderWidth: 10,
    borderRadius: 100,
    borderLeftColor: "transparent",
    borderBottomColor: "transparent",
    borderRightColor: "grey",
    borderTopColor: "grey",
    //transform: [{ rotateZ: "-135deg" }],
  },
  display: {
    color: "gray",
    position: "absolute",
    fontSize: 10,
    fontWeight: "bold",
  },
});

export default CapacityCircle;
