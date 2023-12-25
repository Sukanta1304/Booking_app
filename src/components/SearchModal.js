import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { heading, text } from '../constants/globalStyles'
import { Input } from '@rneui/base'

const SearchModal = ({visible,setVisible}) => {
  return (
    <Modal visible={visible.state}>
        <TouchableOpacity onPress={()=>setVisible({state:false,type:''})} style={{margin:10}}>
        <Text style={[text,{color:'blue',alignSelf:'flex-end'}]}>Cancel</Text>
        </TouchableOpacity>
     {
        visible.type==='boarding'?
        <View style={{margin:10}}>
            <Text style={heading}>Where from?</Text>
            <Input placeholder='Search Airport'/>
        </View>:
        <View style={{margin:10}}> 
        <Text style={heading}>Where to?</Text>
        <Input placeholder='Search Airport'/>
    </View>
     }
    </Modal>
  )
}

export default SearchModal

const styles = StyleSheet.create({})