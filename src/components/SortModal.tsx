import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'


export type SortType = 'default' | 'price-low' | 'price-high' | 'rating-high' | 'stock-high'

interface SortOptionItem {
    label: string
    value: SortType
}

interface SortModalProps {
    visible: boolean
    sortOption: SortType
    onClose: () => void
    onSelectSortOption: (option: SortType) => void
}

const sortOptions: SortOptionItem[] = [
    { label: 'Default', value: 'default' },
    { label: 'Price: High to Low', value: 'price-low' },
    { label: 'Price: Low to High', value: 'price-high' },
    { label: 'Rating: High to Low', value: 'rating-high' },
    { label: 'Stock: High to Low', value: 'stock-high' }
]



const SortModal: React.FC<SortModalProps> = ({
    visible,
    sortOption,
    onClose,
    onSelectSortOption
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
                    <Text style={styles.modalTitle}>Sort By</Text>

                    {sortOptions.map((opt) => (
                        <TouchableOpacity
                            key={opt.value}
                            style={[styles.modalOption, sortOption === opt.value && styles.modalOptionSelected]}
                            onPress={() => { onSelectSortOption(opt.value); onClose() }}
                        >

                            <Text style={sortOption === opt.value ? styles.modalOptionTextSelected : styles.modalOptionText}>{opt.label}</Text>

                        </TouchableOpacity>
                    ))}
                </View>
            </TouchableOpacity>

        </Modal>
    )
}

export default SortModal

const styles = StyleSheet.create({
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
        marginBottom: 12,
        marginVertical: 4,
    },
    modalOptionSelected: {
        backgroundColor: '#EBF3FE',

    },
    modalOptionText: {
        fontFamily: 'Montserrat-Regular',
        color: '#333'
    },
    modalOptionTextSelected: {
        fontFamily: 'Montserrat-SemiBold',
        color: '#4392F9'
    }


})