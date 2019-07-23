import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Colors } from "react-native/Libraries/NewAppScreen";

class Section extends React.Component {
    render() {
        return (
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>{this.props.title}</Text>
              <Text style={styles.sectionDescription}>
                {this.props.children}
              </Text>
            </View>
        )
    }
};

const styles = StyleSheet.create({
    sectionContainer: {
        marginTop: 32,
        paddingHorizontal: 24
      },
      sectionTitle: {
        fontSize: 24,
        fontWeight: "600",
        color: Colors.black
      },
      sectionDescription: {
        marginTop: 8,
        fontSize: 18,
        fontWeight: "400",
        color: Colors.dark
      }
});

export default Section