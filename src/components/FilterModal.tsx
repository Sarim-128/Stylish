import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'


interface FilterModalProps {
    visible: boolean,
    selectedCategory: string,
    onClose: () => void,
    onSelectedCategory: (category: string) => void
}

const categories = ['all', 'beauty', 'fragrances', 'furniture']


const FilterModal: React.FC<FilterModalProps> = ({
    visible,
    selectedCategory,
    onClose,
    onSelectedCategory
}) => {

    return (
        <Modal
            visible={visible}
            transparent={true}
            animationType='fade'
            onRequestClose={onClose}
        >
            <TouchableOpacity
                style={styles.modalOverlay}
                activeOpacity={1}
                onPress={onClose}
            >
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>  Select Category</Text>

                    {categories.map((cat) => (
                        <TouchableOpacity
                            key={cat}
                            style={[styles.modalOption, selectedCategory === cat && styles.modalOptionSelected]}
                            onPress={() => { onSelectedCategory(cat); onClose() }}
                        >
                            <Text>
                                {cat === 'all' ? 'All Products' : cat.charAt(0).toUpperCase() + cat.slice(1)}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </TouchableOpacity>
        </Modal>
    )
}

export default FilterModal

const styles = StyleSheet.create({
    //MODAL STYLE
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: '#FFFFFF',
        width: '80%',
        borderRadius: 12,
        padding: 20,
    },
    modalTitle: {
        fontSize: 16,
        fontFamily: 'Montserrat-SemiBold',
        marginBottom: 12,
        textAlign: 'center',
    },
    modalOption: {
        paddingVertical: 10,
        paddingHorizontal: 12,
        borderRadius: 6,
        marginVertical: 4,
    },
    modalOptionSelected: {
        backgroundColor: '#EBF3FE',
    },
    modalOptionText: {
        fontSize: 14,
        fontFamily: 'Montserrat-Regular',
        color: '#333',
    },
    modalOptionTextSelected: {
        fontSize: 14,
        fontFamily: 'Montserrat-SemiBold',
        color: '#4392F9',
    },

})