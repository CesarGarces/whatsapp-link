import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Linking,
  TextInput,
  Image,
  useColorScheme,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import customData from "./codesData.json";

export default function App() {
  const [number, setNumber] = useState(0);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [colorScheme] = useState(useColorScheme());
  const [items, setItems] = useState(customData);

  const handleClick = () => {
    const numberLength = number.length;
    const codeLength = value.length;
    if (numberLength > 8 && codeLength > 0) {
      Linking.openURL(`https://api.whatsapp.com/send?phone=${value}${number}`);
    } else {
      alert("Please enter a valid number");
    }
  };

  return (
    <View
      style={
        colorScheme === "dark" ? styles.backgroundDark : styles.backgroundLigth
      }
    >
      <Image
        style={{ width: 100, height: 100, marginBottom: 5 }}
        source={require("./assets/adaptive-icon.png")}
      />
      <Text style={{ fontSize: 15, marginBottom: 20 }}>
        Envía whatsapp sin guardar contacto
      </Text>
      <View style={{ width: "50%" }}>
        <DropDownPicker
          style={{
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
            backgroundColor: "#676D67",
          }}
          dropDownStyle={{
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
          }}
          searchable={true}
          placeholder="Código País"
          placeholderStyle={{ fontWeight: "bold" }}
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
        />
        <Text style={styles.labelText}>Teléfono:</Text>
        <TextInput
          autoFocus={true}
          autoCorrect={false}
          autoComplete="off"
          keyboardType="numeric"
          onChangeText={e => setNumber(e)}
          style={styles.inputNumber}
        />
      </View>
      {value && number ? (
        <Button
          title="Enviar"
          onPress={() => {
            handleClick();
          }}
        />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  backgroundDark: {
    backgroundColor: "#005C4B",
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 100,
  },
  backgroundLigth: {
    backgroundColor: "#fff",
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 100,
  },
  inputNumber: {
    borderWidth: 1,
    borderColor: "#000",
    marginTop: 20,
    marginBottom: 20,
    width: "100%",
    height: 40,
    fontSize: 20,
  },
  labelText: {
    paddingTop: 30,
    fontSize: 20,
    fontWeight: "bold",
    alignSelf: "center",
  },
});
