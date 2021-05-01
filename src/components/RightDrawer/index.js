import React, { useState } from 'react';
import { Drawer, Button } from 'antd';

const RightDrawer = () => {
    
    const [visible, setVisible] = useState(true);

    return ( 
         <>
            <Drawer
                title="Category"
                placement="right"
                mask={false}
                visible={visible}
            >
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
            </Drawer>
        </>
     );
}
 
export default RightDrawer;