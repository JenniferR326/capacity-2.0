import React from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  ScrollView,
  Button,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from "react-native-simple-radio-button";
import { connect } from "react-redux";
import { singlePlace } from "./styles";
import { homeStyleSheet } from "./styles";
import { TouchableOpacity } from "react-native-gesture-handler";
//import { useNavigation } from "@react-navigation/native";

// importing fbFuncs
import { getOrAddPlace, addCapacity } from "../funcs/placesFuncs";

import { addFave, updateFave, removeFave, getFave } from "../funcs/userFuncs";

class SinglePlaceScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      capacityPercent: 0,
      capacities: [
        { label: "Empty", value: 0 },
        { label: "A Few People", value: 25 },
        { label: "Half Full", value: 50 },
        { label: "Full", value: 75 },
        { label: "Crowded", value: 100 },
      ],
      initialRadioPos: -1,
      formLabel: 0,
      favorited: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    const favorited = await updateFave(
      this.props.user.uid,
      this.props.route.params.id
    );
    this.setState({ favorited });
  }

  handleChange(capacityPercent) {
    this.setState({ capacityPercent });
  }

  // grab capacity and write to the db
  async handleSubmit(evt) {
    await getOrAddPlace(
      this.props.route.params.id,
      this.props.route.params.placeLat,
      this.props.route.params.placeLng,
      this.props.route.params.name
    );
    alert("Thanks for rating!");
    console.log("place created");
    addCapacity(this.props.route.params.id, this.state.capacityPercent);
  }

  render() {
    const colors = this.props.route.params.color;
    this.state.capacities.color = colors.text;
    return (
      <SafeAreaView style={singlePlace.safeArea}>
        <ScrollView>
          <View>
            <Ionicons
              style={[singlePlace.starIcon, { color: colors.text }]}
              name={this.state.favorited ? "ios-star" : "ios-star-outline"}
              size={32}
              onPress={() => {
                if (this.props.user.email) {
                  if (this.state.favorited) {
                    removeFave(this.props.user.uid, this.props.route.params.id);
                  } else {
                    addFave(
                      this.props.user.uid,
                      this.props.route.params.id,
                      this.props.route.params.name,
                      this.props.route.params.placeLat,
                      this.props.route.params.placeLng
                    );
                    console.log("THIS IS FAVORITE");
                    getFave(this.props.user.uid);
                  }
                  this.setState({ favorited: !this.state.favorited });
                } else {
                  alert("create account to favorite");
                  this.props.navigation.navigate("SignUp");
                }
              }}
            />
            <Text style={[singlePlace.title, { color: colors.text }]}>
              {this.props.route.params.name}
            </Text>
            <Text style={[singlePlace.subtitle, { color: colors.text }]}>
              This location is at {this.props.route.params.capacity}
            </Text>
          </View>
          <View>
            <Text>
              {Array(this.state.capacityPercent)
                .fill()
                .map((_, index) => (
                  <React.Fragment key={index}>
                    <Ionicons
                      key={index}
                      style={(singlePlace.icon, { color: colors.text })}
                      name="md-person"
                      size={32}
                      color="black"
                    />
                    {"  "}
                  </React.Fragment>
                ))}
              {Array(100 - this.state.capacityPercent)
                .fill()
                .map((_, index) => (
                  <React.Fragment key={index}>
                    <Ionicons
                      key={index}
                      style={singlePlace.icon}
                      name="md-person"
                      size={32}
                      color="grey"
                    />
                    {"  "}
                  </React.Fragment>
                ))}
            </Text>
          </View>
          <Button
            title="Leave Feedback"
            onPress={() =>
              this.props.navigation.navigate("UserFeedback", {
                placeId: this.props.route.params.id,
                color: colors,
              })
            }
          />

          <View style={{ alignItems: "center" }}>
            <TouchableOpacity
              style={homeStyleSheet.button}
              onPress={() => this.props.navigation.navigate("Camera")} //open the camera component
            >
              <Text style={[homeStyleSheet.buttonText, { color: colors.text }]}>
                Take a Live Photo
              </Text>
            </TouchableOpacity>
          </View>

          {this.props.route.params.isHere && (
            <View style={[{ alignItems: "center", color: colors.text }]}>
              <Text style={[singlePlace.subtitle, { color: colors.text }]}>
                How Crowded Was It?
              </Text>
              <RadioForm
                labelColor={colors.text}
                key={this.state.formLabel}
                radio_props={this.state.capacities}
                radio_propsstyle={{ color: colors.text }}
                initial={this.state.initialRadioPos}
                onPress={this.handleChange}
                formHorizontal={true}
                labelHorizontal={false}
                style={{ textAlign: "center" }}
              />
              <Button title="Submit" onPress={this.handleSubmit} />
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const mapState = (state) => ({
  user: state.user,
});

export default connect(mapState)(SinglePlaceScreen);
