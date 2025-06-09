import React from 'react'

const Title = ({ title, subTitle }: { title: string, subTitle?: string }) => {
 return (
        <div className="titleBox">
            <h2 className="title">{title}</h2>
            <p className="subTitle">{subTitle}</p>
        </div>
    )
}

export default Title