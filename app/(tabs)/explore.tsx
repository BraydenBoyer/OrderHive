import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Image, Platform } from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import {HelloWave} from "@/components/HelloWave";
import React from "react";

export default function TabTwoScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={<Ionicons size={310} name="code-slash" style={styles.headerImage} />}>
      <ThemedView style={styles.titleContainer} lightColor={undefined} darkColor={undefined}>
        <ThemedText type="title" style={undefined} lightColor={undefined} darkColor={undefined}>Explore</ThemedText>
      </ThemedView>
      <ThemedText style={undefined} lightColor={undefined} darkColor={undefined}>This app includes example code to help you get started.</ThemedText>
      <Collapsible title="File-based routing">
        <ThemedText style={undefined} lightColor={undefined} darkColor={undefined}>
          This app has two screens:{' '}
          <ThemedText type="defaultSemiBold" style={undefined} lightColor={undefined} darkColor={undefined}>app/(tabs)/index.tsx</ThemedText> and{' '}
          <ThemedText type="defaultSemiBold" style={undefined} lightColor={undefined} darkColor={undefined}>app/(tabs)/explore.tsx</ThemedText>
        </ThemedText>
        <ThemedText style={undefined} lightColor={undefined} darkColor={undefined}>
          The layout file in <ThemedText type="defaultSemiBold" style={undefined} lightColor={undefined}
                                         darkColor={undefined}>app/(tabs)/_layout.tsx</ThemedText>{' '}
          sets up the tab navigator.
        </ThemedText>
        <ExternalLink href="https://docs.expo.dev/router/introduction">
          <ThemedText type="link" style={undefined} lightColor={undefined} darkColor={undefined}>Learn more</ThemedText>
        </ExternalLink>
      </Collapsible>
      <Collapsible title="Android, iOS, and web support">
        <ThemedText style={undefined} lightColor={undefined} darkColor={undefined}>
          You can open this project on Android, iOS, and the web. To open the web version, press{' '}
          <ThemedText type="defaultSemiBold" style={undefined} lightColor={undefined} darkColor={undefined}>w</ThemedText> in the terminal running this project.
        </ThemedText>
      </Collapsible>
      <Collapsible title="Images">
        <ThemedText style={undefined} lightColor={undefined} darkColor={undefined}>
          For static images, you can use the <ThemedText type="defaultSemiBold" style={undefined} lightColor={undefined}
                                                         darkColor={undefined}>@2x</ThemedText> and{' '}
          <ThemedText type="defaultSemiBold" style={undefined} lightColor={undefined} darkColor={undefined}>@3x</ThemedText> suffixes to provide files for
          different screen densities
        </ThemedText>
        <Image source={require('@/assets/images/react-logo.png')} style={{ alignSelf: 'center' }} />
        <ExternalLink href="https://reactnative.dev/docs/images">
          <ThemedText type="link" style={undefined} lightColor={undefined} darkColor={undefined}>Learn more</ThemedText>
        </ExternalLink>
      </Collapsible>
      <Collapsible title="Custom fonts">
        <ThemedText style={undefined} lightColor={undefined} darkColor={undefined}>
          Open <ThemedText type="defaultSemiBold" style={undefined} lightColor={undefined} darkColor={undefined}>app/_layout.tsx</ThemedText> to see how to load{' '}
          <ThemedText style={{fontFamily: 'SpaceMono'}} lightColor={undefined} darkColor={undefined}>
            custom fonts such as this one.
          </ThemedText>
        </ThemedText>
        <ExternalLink href="https://docs.expo.dev/versions/latest/sdk/font">
          <ThemedText type="link" style={undefined} lightColor={undefined} darkColor={undefined}>Learn more</ThemedText>
        </ExternalLink>
      </Collapsible>
      <Collapsible title="Light and dark mode components">
        <ThemedText style={undefined} lightColor={undefined} darkColor={undefined}>
          This template has light and dark mode support. The{' '}
          <ThemedText type="defaultSemiBold" style={undefined} lightColor={undefined} darkColor={undefined}>useColorScheme()</ThemedText> hook lets you inspect
          what the user's current color scheme is, and so you can adjust UI colors accordingly.
        </ThemedText>
        <ExternalLink href="https://docs.expo.dev/develop/user-interface/color-themes/">
          <ThemedText type="link" style={undefined} lightColor={undefined} darkColor={undefined}>Learn more</ThemedText>
        </ExternalLink>
      </Collapsible>
      <Collapsible title="Animations">
        <ThemedText style={undefined} lightColor={undefined} darkColor={undefined}>
          This template includes an example of an animated component. The{' '}
          <ThemedText type="defaultSemiBold" style={undefined} lightColor={undefined} darkColor={undefined}>components/HelloWave.tsx</ThemedText> component uses
          the powerful <ThemedText type="defaultSemiBold" style={undefined} lightColor={undefined} darkColor={undefined}>react-native-reanimated</ThemedText> library
          to create a waving hand animation.
        </ThemedText>
        {Platform.select({
          ios: (
            <ThemedText style={undefined} lightColor={undefined} darkColor={undefined}>
              The <ThemedText type="defaultSemiBold" style={undefined} lightColor={undefined} darkColor={undefined}>components/ParallaxScrollView.tsx</ThemedText>{' '}
              component provides a parallax effect for the header image.
            </ThemedText>
          ),
        })}
      </Collapsible>
      <HelloWave></HelloWave>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
