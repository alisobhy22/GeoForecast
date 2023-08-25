import React from 'react'
import { ResponsiveChoropleth } from '@nivo/geo'
import geoJSONData from './world_countries.json'

export const MyResponsiveChoropleth = ({ data, setCountry }) => {
    const CustomTooltip = ({ node }) => (
        <div className="dark:bg-gray-800 p-2 border rounded shadow">
            <div>Country: {node.label}</div>
            <div>Value: {node.formattedValue}</div>
        </div>
    );


    const handleClick = (node, event) => {
        console.log(node)
        console.log(event)
        setCountry(node.label)
    }

    return (
        <ResponsiveChoropleth
            data={data}
            features={geoJSONData.features}
            projectionScale={225}
            margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
            colors="RdYlBu"
            domain={[0, 50]}
            unknownColor="#666666"
            label="properties.name"
            valueFormat=".2s"
            projectionTranslation={[0.5, 0.6]}
            projectionRotation={[0, 0, 0]}
            enableGraticule={false}
            borderWidth={1}
            tooltip={({ feature }) => (
                <CustomTooltip node={{ label: feature.properties.name, formattedValue: feature.value }} />
            )}
            borderColor="black"
            onClick={handleClick}
        />
    );
};
