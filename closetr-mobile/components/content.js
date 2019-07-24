import { LearnMoreLinks, DebugInstructions, ReloadInstructions, Colors } from "react-native/Libraries/NewAppScreen";
import { View, StyleSheet, Text } from 'react-native';
import Section from './section';
import React from 'react';

class Content extends React.Component {
    render() {
        return(
            <View style={styles.body}>
                <Section title='Step One'>
                  Edit <Text style={styles.highlight}>App.js</Text> to change this
                  screen and then come back to see your edits.
                </Section>
                <Section title='See Your Changes'>
                  <ReloadInstructions />
                </Section>
                <Section title='Debug'>
                  <DebugInstructions />
                </Section>
                <Section title='Learn More'>
                  Read the docs to discover what to do next:
                </Section>
                <LearnMoreLinks />
              </View>
        );
    };
}

const styles = StyleSheet.create({
    body: {
      backgroundColor: Colors.white
    },
    highlight: {
      fontWeight: "700"
    }
  });

export default Content;