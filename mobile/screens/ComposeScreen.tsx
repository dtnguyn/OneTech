import Slider from "@react-native-community/slider";
import React, { useEffect, useRef, useState } from "react";
import { Dimensions, StatusBar, StyleSheet, View } from "react-native";
import {
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native-gesture-handler";
import CustomText from "../components/util/CustomText";
import { useTheme } from "../context/ThemeContext";
import { laptopSpec, mobileSpec, pcSpec } from "../utils/specArr";
import { ComposeRouteProp, ScreenNavigationProp } from "../utils/types";
import {
  RichEditor,
  RichToolbar,
  actions,
  defaultActions,
} from "react-native-pell-rich-editor";
import {
  launchCamera,
  launchImageLibrary,
  ImagePickerResponse,
} from "react-native-image-picker";
import {
  useDeleteImagesMutation,
  useUploadImageMutation,
} from "../generated/graphql";
import { ReactNativeFile } from "apollo-upload-client";
import { BackHandler } from "react-native";
import uuid from "react-native-uuid";

interface Props {
  navigation: ScreenNavigationProp;
  route: ComposeRouteProp;
}

const ComposeScreen: React.FC<Props> = ({ navigation, route }) => {
  const [compose, setCompose] = useState({
    title: route.params.title ? route.params.title : "",
    content: route.params.content,
  });
  const { theme } = useTheme();
  const [images, setImages] = useState<Array<string>>([]);
  const [rating, setRating] = useState(route.params.rating);
  const [specsArr, setSpecsArr] = useState<Array<string>>([]);
  const [overallRating, setOverallRating] = useState<number>(
    route.params.rating?.overall ? route.params.rating.overall : 0
  );
  const RichText = useRef<any>(); //reference to the RichEditor component
  const [uploadImageMutation, {}] = useUploadImageMutation();
  const [deleteImagesMutation, {}] = useDeleteImagesMutation();

  const handleUploadImage = async (
    response: ImagePickerResponse,
    success: (url: string) => void,
    failure: (err: string, options?: any | undefined) => void,
    progress?: ((percent: number) => void) | undefined
  ) => {
    if (!response.fileName || !response.uri) {
      failure("image is not valid");
      return;
    }

    const imgUUID = uuid.v4();
    const str = imgUUID + Date().toString();
    let imageId = "";
    for (let i = 0; i < str.length; i++) {
      if (str[i] === " ") {
        imageId += "_";
      } else imageId += str[i];
    }
    const file = new ReactNativeFile({
      uri: response.uri!,
      name: "a.jpg",
      type: "image/jpeg",
    });
    await uploadImageMutation({
      variables: {
        image: file,
        imageId,
      },
    })
      .then((res) => {
        if (res.data?.uploadImage.status) {
          images.push(imageId);
          success(res.data.uploadImage.data![0] as string);
        } else {
          failure(res.data?.uploadImage.message!);
        }
      })
      .catch((error) => {
        failure(error.message);
      });
  };

  const handleDeleteImages = (arr: Array<string>) => {
    if (!arr.length) return;
    deleteImagesMutation({
      variables: {
        imageIds: arr,
      },
    });
  };

  useEffect(() => {
    if (!rating || !route.params.category) return;
    switch (route.params.category) {
      case "phone":
        setSpecsArr(mobileSpec);
        break;
      case "laptop":
        setSpecsArr(laptopSpec);
        break;
      case "pc":
        setSpecsArr(pcSpec);
        break;
    }
  }, []);

  useEffect(() => {
    let sum = 0;
    for (const spec of specsArr) {
      if ((rating as any)[spec.toLowerCase()] === 0) {
        sum = 0;
        break;
      } else {
        sum += (rating as any)[spec.toLowerCase()];
      }
    }
    setOverallRating(sum === 0 ? sum : sum / specsArr.length);
  }, [rating]);

  useEffect(() => {
    if (!route.params.rating?.overall) return;
    setOverallRating(route.params.rating?.overall!);
  }, []);

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", () => {
      console.log("delete image: ", images);
      handleDeleteImages(images);
      navigation.pop();
      return true;
    });
    return () => {
      BackHandler.removeEventListener("hardwareBackPress", () => {
        return true;
      });
    };
  }, []);

  return (
    <ScrollView>
      <View style={styles.container}>
        {route.params.title !== null ? (
          <CustomText style={styles.label}>Title</CustomText>
        ) : null}

        {route.params.title !== null ? (
          <TextInput
            style={styles.titleInput}
            value={compose?.title}
            placeholder="Enter the title here..."
            onChangeText={(text) => setCompose({ ...compose, title: text })}
          />
        ) : null}

        {rating ? (
          <View style={styles.ratingContainer}>
            <CustomText style={styles.label}>{`Rating (${overallRating.toFixed(
              1
            )})`}</CustomText>
            {specsArr.map((spec) => (
              <View style={{ width: "90%", alignItems: "center" }} key={spec}>
                <CustomText fontFamily="MRegular">{`${spec} (${(rating as any)[
                  spec.toLowerCase()
                ].toFixed(1)})`}</CustomText>
                <Slider
                  style={{ width: "100%", height: 40 }}
                  minimumValue={0}
                  maximumValue={10}
                  step={0.1}
                  value={(route.params.rating as any)[spec.toLowerCase()]}
                  onValueChange={(value) => {
                    setRating({ ...rating, [spec.toLowerCase()]: value });
                  }}
                  minimumTrackTintColor="#52AF77"
                  maximumTrackTintColor="#2E563F"
                />
              </View>
            ))}
          </View>
        ) : null}

        <CustomText style={styles.label}>Content</CustomText>

        <RichToolbar
          style={{ width: Dimensions.get("window").width - 30 }}
          editor={RichText}
          disabled={false}
          selectedIconTint={"#017BFE"}
          onPressAddImage={() => {
            launchImageLibrary(
              {
                mediaType: "photo",
                includeBase64: true,
                // maxWidth: 300,
                // maxHeight: 300,
                quality: 1,
              },
              (response) => {
                if (response.didCancel) return;
                handleUploadImage(
                  response,
                  (url) => {
                    console.log("success: ", images);
                    RichText.current.insertImage(url);
                  },
                  (errMsg, _) => {
                    alert(errMsg);
                  }
                );
              }
            );
          }}
          // iconSize={40}
          actions={[
            actions.setBold,
            actions.setItalic,
            actions.insertBulletsList,
            actions.insertOrderedList,
            actions.insertImage,
          ]}

          // iconMap={{
          //   customAction: customIcon,
          // }}
        />
        <RichEditor
          disabled={false}
          // containerStyle={styles.contentInput}
          ref={RichText}
          style={styles.inputContainer}
          editorStyle={styles.inputContent}
          // containerStyle={styles.inputContent}
          placeholder={"Start Writing Here"}
          initialContentHTML={compose.content}
          onChange={(text) => setCompose({ ...compose, content: text })}
          // editorInitializedCallback={editorInitializedCallback}
          // onHeightChange={handleHeightChange}
        />

        <TouchableOpacity
          containerStyle={{
            ...styles.buttonContainer,
            backgroundColor:
              (rating && overallRating === 0) ||
              (!compose.title && route.params.title != null) ||
              !compose.content
                ? "#C4C4C4"
                : "#017BFE",
          }}
          disabled={
            (rating && overallRating === 0) ||
            (!compose.title && route.params.title != null) ||
            !compose.content
          }
          onPress={() => {
            if (rating) {
              let finalRating = rating;
              if (finalRating.overall !== overallRating)
                finalRating.overall = overallRating;
            }
            route.params.onCompose(
              compose.title,
              compose.content,
              rating,
              images
            );
            navigation.pop();
          }}
        >
          <CustomText style={{ color: "#fff" }}>Submit</CustomText>
        </TouchableOpacity>
        <TouchableOpacity
          containerStyle={{
            ...styles.buttonContainer,
            backgroundColor: "#ed2626",
            marginTop: 10,
          }}
          onPress={() => {
            handleDeleteImages(images);
            navigation.pop();
          }}
        >
          <CustomText style={{ color: "#fff" }}>Cancel</CustomText>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
    paddingBottom: 10,
  },
  label: {
    marginTop: 20,
    marginBottom: 5,
    marginStart: 30,
    alignSelf: "flex-start",
  },
  titleInput: {
    marginBottom: 20,
    width: "90%",
    height: 50,
    fontFamily: "MMedium",
    borderColor: "gray",
    backgroundColor: "#fff",
    borderWidth: 0.2,
    borderRadius: 5,
    padding: 5,
  },
  ratingContainer: {
    width: "100%",
    display: "flex",
    alignItems: "center",
  },
  inputContainer: {
    marginBottom: 20,
    width: Dimensions.get("window").width - 30,
    minHeight: 500,
    fontFamily: "MMedium",
    borderColor: "gray",
    backgroundColor: "#fff",
    borderWidth: 0.2,
    borderRadius: 5,
  },
  inputContent: {},
  buttonContainer: {
    width: "90%",
    borderRadius: 15,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default ComposeScreen;
