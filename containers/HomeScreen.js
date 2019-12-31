import * as WebBrowser from "expo-web-browser";
import React from "react";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { connect } from "react-redux";
import crypto from "crypto";

import { MonoText } from "../components/StyledText";
import {
  testTodo,
  testTodoReset,
  getBalance,
  postPaymentTransaction,
  getListenToTransaction,
} from "../actions";

function HomeScreen({
  test,
  testTodo,
  testTodoReset,
  testPending,
  balance,
  getBalance,
  postPaymentTransaction,
  getListenToTransaction,
}) {
  console.log("balance is", balance ? balance.xrpBalance : "");
  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        <TouchableOpacity
          onPress={() => {
            testTodo();
          }}
        >
          <Text>{test}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            testTodoReset();
          }}
        >
          <Text>Return</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            console.log(
              "====================================================================="
            );
            // const result = generateNewWallet();
            // console.log("==generateWalletAddress==", result);
            // const address = getAddress(result);
            // console.log("==address==", address);
            // const rippleClassicAddress = getRippleClassicAddressFromXAddress(address);
            // console.log("==rippleClassicAddress==", rippleClassicAddress);
            // const mnemonic = result.mnemonic;
            // console.log("==mnemonic==", mnemonic);
            // const walletFromMnemonic = getWalletFromMnemonic(mnemonic);
            // console.log("==wallet from mnemonic==", walletFromMnemonic);
            // console.log(
            //   "==address from mnemonic==",
            //   walletFromMnemonic.getAddress()
            // );
            // console.log(
            //   "Is it the same as the one from mnemonic?",
            //   address === walletFromMnemonic.getAddress()
            // );
            const myAddress = "rGPvYEMkxmeVsLBBPsAekxuFdxbRSxe71k";
            getBalance();
            // use crypto
            // console.log(crypto.randomBytes(32).toString('hex'))
          }}
        >
          <Text>Get Balance</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            const address = "rGPvYEMkxmeVsLBBPsAekxuFdxbRSxe71k";
            const destinationAddress = "rHb9CJAWyB4rj91VRWn96DkukG4bwdtyTh";
            const amountValue = "0.01";
            const secret = "sp1yvMNUaep9hWKXGBs3KH6a5zrDN";
            postPaymentTransaction(address, destinationAddress, amountValue, secret);
            // getListenToTransaction(destinationAddress);
          }}
        >
          <Text>Post Payment Transaction</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            const destinationAddress = "rHb9CJAWyB4rj91VRWn96DkukG4bwdtyTh";
            getListenToTransaction(destinationAddress);
          }}
        >
          <Text>Transaction</Text>
        </TouchableOpacity>
        {/* <View style={styles.welcomeContainer}>
          <Image
            source={
              __DEV__
                ? require('../assets/images/robot-dev.png')
                : require('../assets/images/robot-prod.png')
            }
            style={styles.welcomeImage}
          />
        </View>

        <View style={styles.getStartedContainer}>
          <DevelopmentModeNotice />

          <Text style={styles.getStartedText}>Get started by opening</Text>

          <View
            style={[styles.codeHighlightContainer, styles.homeScreenFilename]}>
            <MonoText>screens/HomeScreen.js</MonoText>
          </View>

          <Text style={styles.getStartedText}>
            Change this text and your app will automatically reload.
          </Text>
        </View>

        <View style={styles.helpContainer}>
          <TouchableOpacity onPress={handleHelpPress} style={styles.helpLink}>
            <Text style={styles.helpLinkText}>
              Help, it didn’t automatically reload!
            </Text>
          </TouchableOpacity>
        </View> */}
      </ScrollView>

      {/* <View style={styles.tabBarInfoContainer}>
        <Text style={styles.tabBarInfoText}>
          This is a tab bar. You can edit it in:
        </Text>

        <View
          style={[styles.codeHighlightContainer, styles.navigationFilename]}>
          <MonoText style={styles.codeHighlightText}>
            navigation/MainTabNavigator.js
          </MonoText>
        </View>
      </View> */}
    </View>
  );
}

HomeScreen.navigationOptions = {
  title: "Home"
};

function DevelopmentModeNotice() {
  if (__DEV__) {
    const learnMoreButton = (
      <Text onPress={handleLearnMorePress} style={styles.helpLinkText}>
        Learn more
      </Text>
    );

    return (
      <Text style={styles.developmentModeText}>
        Development mode is enabled: your app will be slower but you can use
        useful development tools. {learnMoreButton}
      </Text>
    );
  } else {
    return (
      <Text style={styles.developmentModeText}>
        You are not in development mode: your app will run at full speed.
      </Text>
    );
  }
}

function handleLearnMorePress() {
  WebBrowser.openBrowserAsync(
    "https://docs.expo.io/versions/latest/workflow/development-mode/"
  );
}

function handleHelpPress() {
  WebBrowser.openBrowserAsync(
    "https://docs.expo.io/versions/latest/workflow/up-and-running/#cant-see-your-changes"
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  developmentModeText: {
    marginBottom: 20,
    color: "rgba(0,0,0,0.4)",
    fontSize: 14,
    lineHeight: 19,
    textAlign: "center"
  },
  contentContainer: {
    paddingTop: 30
  },
  welcomeContainer: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: "contain",
    marginTop: 3,
    marginLeft: -10
  },
  getStartedContainer: {
    alignItems: "center",
    marginHorizontal: 50
  },
  homeScreenFilename: {
    marginVertical: 7
  },
  codeHighlightText: {
    color: "rgba(96,100,109, 0.8)"
  },
  codeHighlightContainer: {
    backgroundColor: "rgba(0,0,0,0.05)",
    borderRadius: 3,
    paddingHorizontal: 4
  },
  getStartedText: {
    fontSize: 17,
    color: "rgba(96,100,109, 1)",
    lineHeight: 24,
    textAlign: "center"
  },
  tabBarInfoContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: "black",
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3
      },
      android: {
        elevation: 20
      }
    }),
    alignItems: "center",
    backgroundColor: "#fbfbfb",
    paddingVertical: 20
  },
  tabBarInfoText: {
    fontSize: 17,
    color: "rgba(96,100,109, 1)",
    textAlign: "center"
  },
  navigationFilename: {
    marginTop: 5
  },
  helpContainer: {
    marginTop: 15,
    alignItems: "center"
  },
  helpLink: {
    paddingVertical: 15
  },
  helpLinkText: {
    fontSize: 14,
    color: "#2e78b7"
  }
});

const mapStateToProps = ({ test, testPending, balance }) => ({
  test,
  testPending,
  balance
});
const mapDispatchToProps = dispatch => ({
  testTodo: () => dispatch(testTodo()),
  testTodoReset: () => dispatch(testTodoReset()),
  getBalance: () => dispatch(getBalance()),
  postPaymentTransaction: (address, destinationAddress, amountValue, secret) =>
    dispatch(postPaymentTransaction(address, destinationAddress, amountValue, secret)),
  getListenToTransaction: account => dispatch(getListenToTransaction(account)),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
