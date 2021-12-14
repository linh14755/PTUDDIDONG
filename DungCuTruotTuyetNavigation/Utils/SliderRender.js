import React from 'react'
import { Image, ScrollView } from 'react-native'
import WebUrl from '../Utils/WebUrl';

export default function SliderRender(images) {
    return (
        <ScrollView pagingEnabled horizontal style={{ width: 350, height: 250 }}>
            {
                images.map((image, index) => {
                    return (
                        <Image
                            key={index}
                            source={{ uri: WebUrl() + image.image_path }}
                            style={{ width: 350, height: 250 }}
                        />
                    )
                })
            }
        </ScrollView>

    )
}
