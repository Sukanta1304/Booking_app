import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ScrollView,
    Alert,
    BackHandler,
  } from 'react-native';
  import React, {useEffect, useState} from 'react';
  import {BottomSheet, Button, CheckBox, color} from '@rneui/base';
  import {heading, text} from '../constants/globalStyles';
  import {Input} from '@rneui/themed';
  import Icon from './Icon';
  
  const PassengerModal = ({visible,setVisible,data,setData}) => {

    const cabinClasses= [
        {
            id:1,
            title:'Economy'
        },
        {
            id:1,
            title:'Premium Economy'
        },
        {
            id:1,
            title:'Business'
        },
        {
            id:1,
            title:'First class'
        }
    ];
    const [selectedCheckIndex,setSelectedCheckIndex]= useState(0);

    const handleIncDec = (type, op) => {
    //   console.log(type, op, 'params');
      if (type === 'adult') {
        if (op === 'inc') {
          setData({
            ...data,
            adults: data.adults + 1,
          });
        } else {
          if (data.adults > 1) {
            setData({
              ...data,
              adults: data.adults - 1,
            });
          }
        }
      } else if (type === 'children') {
        if (op === 'inc') {
          setData({
            ...data,
            children: [
              ...data.children,
              {id: data.children.length, age: ''},
            ],
          });
        } else {
          if (data.children.length) {
            const updateChildren = data.children.pop();
            setData({
              ...data,
              children: data.children,
            });
          }
        }
      }
    };
  
    // useEffect(() => {
    //   const backAction = () => {
    //     setVisible(false);
    //     return true;
    //   };
  
    //   const backHandler = BackHandler.addEventListener(
    //     'hardwareBackPress',
    //     backAction,
    //   );
  
    //   return () => backHandler.remove();
    // }, []);
  
    const handleConfirm = () => {
        
      setData({...data, cabinClass: cabinClasses[selectedCheckIndex].title});

      const chilrenMessage = data?.children
        ?.map((item, i) => `Children: ${i + 1}, Age: ${item.age}`)
        .join('\n');
      Alert.alert(
        'Confirm',
        `Provided flight input  \n adults:${
         data.adults
        } \n children:${data.children.length} \n ${
          data.children.length ? chilrenMessage:''
        } \n Cabin class:${cabinClasses[selectedCheckIndex].title}`,
      );
      setVisible(false);
    };
  
    const handleInputChange = (text, index) => {
      if (text > 17 || text < 0) {
          const updatedata = data.children.map((item, i) =>
          i === index ? {...item, age: ""} : item,
        );
        setData({...data, children: updatedata});
        Alert.alert('Invaliid age', 'Age should be between 1 to 17 years');
      } else {
        const updatedata = data.children.map((item, i) =>
          i === index ? {...item, age: text} : item,
        );
        setData({...data, children: updatedata});
      }
    };
  
    return (
      <BottomSheet
        isVisible={visible}
        onBackdropPress={() => setVisible(false)}>
        <View style={styles.container}>
          <TouchableOpacity
            style={{marginBottom: 10}}
            onPress={() => setVisible(false)}>
            <Text style={[text,{alignSelf:'flex-end',color:'blue'}]}>Cancel</Text>
          </TouchableOpacity>
          <ScrollView>
            <Text style={[heading, {color: 'black'}]}>
              Who's flying
            </Text>
            <View style={styles.mainSingleContainer}>
              <View style={{flex: 1}}>
                <Text style={text}>Adults:</Text>
              </View>
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.singleBtn}
                  onPress={() => handleIncDec('adult', 'dec')}>
                  <Text style={[text]}>-</Text>
                </TouchableOpacity>
  
                <TouchableOpacity style={styles.singleBtn}>
                  <Text style={text}>{data.adults}</Text>
                </TouchableOpacity>
  
                <TouchableOpacity
                  style={styles.singleBtn}
                  onPress={() => handleIncDec('adult', 'inc')}>
                  <Text style={text}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.mainSingleContainer}>
              <View style={{flex: 1}}>
                <Text style={text}>Childrens:</Text>
              </View>
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.singleBtn}
                  onPress={() => handleIncDec('children', 'dec')}>
                  <Text style={[text]}>-</Text>
                </TouchableOpacity>
  
                <TouchableOpacity style={styles.singleBtn}>
                  <Text style={text}>{data.children.length}</Text>
                </TouchableOpacity>
  
                <TouchableOpacity
                  style={styles.singleBtn}
                  onPress={() => handleIncDec('children', 'inc')}>
                  <Text style={text}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
            {data?.children?.length ? (
              <View>
                <Text style={[text, {marginVertical: 10}]}>
                  Age of children at checkout
                </Text>
                {data?.children?.map((child, i) => (
                  <View key={i}>
                    <Text style={[text, {margin: 5}]}>{`Child ${i + 1}`}</Text>
                    <Input
                      placeholder="Enter the age"
                      value={child.age}
                      onChangeText={text => handleInputChange(text, i)}
                    />
                  </View>
                ))}
              </View>
            ) : null}
            <View>
                <View>
                <Text style={[text,{fontSize:18,marginVertical:10}]}>Cabin class</Text>
                </View>
            <View>
            {
                cabinClasses.map((cc,i)=>
                <CheckBox
                key={i}
                title={cc.title}
                containerStyle={{
                  backgroundColor: 'transparent',
                  margin: 5,
                  padding: 0,
                  marginLeft:0
                }}
                checkedIcon="dot-circle-o"
                uncheckedIcon="circle-o"
                checked={selectedCheckIndex === i}
                onPress={() => setSelectedCheckIndex(i)}
              />
                )
            }
            </View>
                

            </View>
          </ScrollView>
          <Button title={'Done'} onPress={handleConfirm} />
        </View>
      </BottomSheet>
    );
  };
  
  export default PassengerModal;
  
  const styles = StyleSheet.create({
    container: {
      backgroundColor: 'white',
      padding: 15,
      // justifyContent: 'center',
      // alignItems: 'center',
    },
    buttonContainer: {
      flex: 1,
      flexDirection: 'row',
      gap: 5,
      borderWidth: 1,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 5,
    },
    singleBtn: {
      padding: 10,
    },
    mainSingleContainer: {
      flexDirection: 'row',
      gap: 15,
      alignItems: 'center',
      marginVertical: 10,
    },
  });
  