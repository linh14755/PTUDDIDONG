import React from 'react'
import {ScrollView } from 'react-native'
import RenderHtml from 'react-native-render-html'

export default function HtmlRender(htmlrd) {
    const source = {
        html: htmlrd
    };
    return (
        <ScrollView>
            <RenderHtml
                contentWidth={1}
                source={source}
            />
        </ScrollView>
    )
}
