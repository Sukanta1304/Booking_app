import {
    Alert,
  Dimensions,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {Switch} from '@rneui/themed';
import {text} from '../constants/globalStyles';
import DestinationModal from './DestinationModal';
import Icon from './Icon';
import moment from 'moment';
import SingleDateModal from './SingleDateModal';

const {height, width} = Dimensions.get('window');

const Cars = () => {
  const [returnLoc, setReturnLoc] = useState(true);
  const [openPickModal, setOpenPickModal] = useState(false);
  const [openDate,setOpenDate]= useState({state:false,type:''});
  const [dates,setDates]= useState({date1:new Date(),date2:new Date().setDate(new Date().getDate() + 3)})
  const [openDropModal,setOpenDropModal]= useState(false);

    const setVisible= (state)=>{
        setOpenDate({state: state,type:''})
    };

    const handleDateChange1=(date)=>{
        setDates({...dates,date1:date})
    };
    const handleDateChange2=(date)=>{
        setDates({...dates,date2:date})
    };

    const handleConfirm1 = () => {
        if (!dates.date1) {
          Alert.alert(`Invalid Date`, 'Please select a date to proceed.');
        } else {
            setOpenDate({state:false,type:''})
          Alert.alert(
            `Confirm`,
            `You select \n Date: ${moment(dates.date1)?.format('LL')}`,
          );
        }
      };

      const handleConfirm2 = () => {
        if (!dates.date2) {
          Alert.alert(`Invalid Date`, 'Please select a date to proceed.');
        } else {
            setOpenDate({state:false,type:''})
          Alert.alert(
            `Confirm`,
            `You select \n Date: ${moment(dates.date2)?.format('LL')}`,
          );
        }
      };


  return (
    <View style={{width: width / 1.1}}>
      <View style={styles.firstContainer}>
        <Text style={text}>Return to same location</Text>
        <Switch value={returnLoc} onValueChange={setReturnLoc} />
      </View>
      {returnLoc ?<TouchableOpacity style={styles.pickupContainer} onPress={()=>setOpenPickModal(true)}>
        <Icon library={'AntDesign'} name={'car'} />
        <Text style={text}>Pick up location</Text>
      </TouchableOpacity>:
      <View style={{flexDirection: 'row', marginVertical: 15}}>
      <View style={{flex: 0.2}}>
        <Icon library={'AntDesign'} name={'car'} />
        <Icon library={'Entypo'} name={'flow-line'} />
        <Icon library={'AntDesign'} name={'car'} />
      </View>
      <View style={{flex: 1}}>
        <TouchableOpacity
          style={{borderBottomWidth: 1}}
          onPress={() =>
            setOpenPickModal(true)
          }>
          <Text style={[text, {paddingVertical: 5}]}>Pick-up loaction</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setOpenDropModal(true)}>
          <Text style={[text, {paddingVertical: 5}]}>Drop-off location</Text>
        </TouchableOpacity>
      </View>
      {/* <View
        style={{
          flex: 0.2,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Icon library={'MaterialCommunityIcons'} name={'swap-vertical'} />
      </View> */}
    </View>
      }
      <TouchableOpacity style={styles.pickupContainer} onPress={()=>setOpenDate({state:true,type:'date1'})}>
        <Icon library={'AntDesign'} name={'calendar'} />
        <Text style={text}>{moment(dates.date1).format('ddd MMM D')}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.pickupContainer} onPress={()=>setOpenDate({state:true,type:'date2'})}>
        <Icon library={'AntDesign'} name={'calendar'} />
        <Text style={text}>{moment(dates.date2).format('ddd MMM D')}</Text>
      </TouchableOpacity>
      <DestinationModal
        visible={openPickModal}
        setVisible={setOpenPickModal}
        placeHoleder={'Pick-up location'}
      />
      <DestinationModal
        visible={openDropModal}
        setVisible={setOpenDropModal}
        placeHoleder={'drop-off location'}
      />
      <SingleDateModal
        visible={openDate.state && openDate.type==='date1'}
        setVisible={setVisible}
        handleDateChange={handleDateChange1}
        handleConfirm={handleConfirm1}
      />
      <SingleDateModal
        visible={openDate.state && openDate.type==='date2'}
        setVisible={setVisible}
        handleDateChange={handleDateChange2}
        handleConfirm={handleConfirm2}
      />
    </View>
  );
};

export default Cars;

const styles = StyleSheet.create({
  firstContainer: {
    width: width/1.1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 5,
    padding:10,
    borderWidth:1,
    borderRadius:5,
    alignSelf:'center',
    marginBottom:10,
  },
  pickupContainer: {
    flexDirection: 'row',
    gap: 10,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    paddingVertical:15,
    marginBottom:10,
  },
});
