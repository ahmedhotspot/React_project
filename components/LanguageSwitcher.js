import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Svg, { G, Path, Text, TSpan, Defs, ClipPath, Rect } from 'react-native-svg';
import { useLanguage } from '../locales';

const LanguageSwitcher = () => {
  const { currentLanguage, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    const newLanguage = currentLanguage === 'ar' ? 'en' : 'ar';
    setLanguage(newLanguage);
  };

  const containerStyle = [
    styles.container,
    currentLanguage === 'ar' ? styles.containerLeft : styles.containerRight,
  ];

  return (
    <View style={containerStyle}>
      <TouchableOpacity
        style={styles.button}
        onPress={toggleLanguage}
        activeOpacity={1}
      >
        <View style={styles.iconContainer}>
          <Svg width={29} height={29} viewBox="0 0 29 29">
            <Defs>
              <ClipPath id="clip-path">
                <Rect y={1} width={29} height={29} fill="none" />
              </ClipPath>
            </Defs>
            <G id="lang_icon" transform="translate(-706 -526)">
              <G id="Scroll_Group_1" transform="translate(706 525)" clipPath="url(#clip-path)">
                <G id="Group_2" transform="translate(-706 -525)">
                  <G id="Group_1">
                    <Path
                      id="Exclusion_1"
                      d="M14.5,17H8.367c-.708,0-1.3,0-1.849,0a3.091,3.091,0,0,1-3.3-2.389,1.13,1.13,0,0,0-.4-.481c-.446-.334-.905-.664-1.35-.983-.3-.213-.6-.433-.9-.651A1.135,1.135,0,0,1,0,11.653a1.1,1.1,0,0,1,.555-.82l.454-.335c.524-.388,1.062-.787,1.614-1.143a1.045,1.045,0,0,0,.509-1.023c-.011-.739-.008-1.49,0-2.216,0-.9.009-1.82-.015-2.73A3.313,3.313,0,0,1,4.03.959,3.193,3.193,0,0,1,6.341,0H6.41c1.69.033,3.416.05,5.13.05S15,.034,16.739,0H16.8a3.168,3.168,0,0,1,2.267.938A3.27,3.27,0,0,1,20,3.293c-.019,2.177-.015,4.39-.012,6.53,0,1.277,0,2.6,0,3.9a3.074,3.074,0,0,1-3.259,3.273C16.08,17,15.373,17,14.5,17ZM9.05,5v7h5.08V11.13H10.05V8.87h3.51V8.02H10.05V5.87H13.99V5Z"
                      transform="translate(715 538)"
                      fill="#ec2241"
                    />
                    <Path
                      id="Path_6029"
                      d="M9.944,16.983c-2.449,0-4.811.048-7.171-.017A2.985,2.985,0,0,1,.018,14.055Q-.016,8.5.019,2.938A2.986,2.986,0,0,1,3.031.032q5.346-.066,10.693,0a3.052,3.052,0,0,1,3.059,2.33,1.2,1.2,0,0,0,.4.536c.755.57,1.535,1.106,2.3,1.666.683.5.688,1.083.013,1.582-.714.527-1.424,1.061-2.163,1.55a.954.954,0,0,0-.472.923c.019,1.432,0,1.463-1.457,1.424a4.725,4.725,0,0,0-3.593.993C10.439,12.037,9.951,15.177,9.944,16.983Z"
                      transform="translate(706 526)"
                      fill="#ec2241"
                    />
                    <Text
                      id="ع"
                      transform="translate(710 536)"
                      fill="#fff"
                      fontSize={10}
                      fontFamily="SegoeUI-Semibold, Segoe UI"
                      fontWeight="600"
                    >
                      <TSpan x={0} y={0}>ع</TSpan>
                    </Text>
                  </G>
                </G>
              </G>
            </G>
          </Svg>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 10,
    zIndex: 1000,
  },
  containerLeft: {
    left: 10,
    right: undefined,
  },
  containerRight: {
    right: 10,
    left: undefined,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    width: 29,
    height: 29,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default LanguageSwitcher;

