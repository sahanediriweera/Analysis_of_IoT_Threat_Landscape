import React from 'react'

import appLogo from './images/amplichat.png'
import iotlandscape  from './images/iot.png'



import appleStoreBadge from './images/apple_store_badge.svg'
import googlePlayBadge from './images/google_play_badge.png'

import coverImage from './images/iot.png'

// endorsement images
import dreamhub_filled from './images/dreamhub_filled.png'
import voiceqna_filled from './images/voiceqna_fill_v2_gradient.png'
import voicemirror_filled from './images/voice_mirror_v_1024.png'
import bazipaipai_unfilled from './images/bazipaipai_64.png'
import spindrifthome_filled from './images/sh_unfill_1024.png'


// section images
import guitar from './images/hack.jpg'
import event_phones from './images/iotLanscape.jpg'
import foggy_blue from './images/wallpaperflare.com_wallpaper(5).jpg'
import purple_phones from './images/wallpaperflare.com_wallpaper(4).jpg'
import purple_light from './images/wallpaperflare.com_wallpaper(3).jpg'
import concert_classic from './images/collin-8FxJi5wuwKc-unsplash.jpg'

import discordImage from './images/discord.png'

export const initialState = {
    // when in dev, change appURL to local url
    // appURL: 'http://localhost:3000',  
    // when in production, change appURL to real url
    appURL: 'https://amplichat.com',

    appLogo: iotlandscape,
    appName: 'AmpliChat',

    coverTitle: 'Analyzing the IoT Threat Landscape',
    coverText: 'In today \'s interconnected world, the Internet of Things (IoT) has revolutionized the way we live, bringing unparalleled convenience and efficiency to our daily lives. From smart home devices to industrial automation, IoT has transformed various sectors. However, with this innovation comes a critical concern - the security of IoT devices.',
    appleStoreBadge: appleStoreBadge,
    appleStoreLink: 'https://apps.apple.com/us/app/amplichat/id1499570373',
    googlePlayBadge: googlePlayBadge,
    googlePlayLink: 'https://apps.apple.com/us/app/amplichat/id1499570373',

    coverImage: coverImage,

    endorsementTitle: `Discovering Vulnerabilities in Your IoT Devices: A Comprehensive Guide`,
    endorsementText: `Technologies Used in Our Web Project`,
    endorsementList: [
        {
            title: `React`,
            titleColor: `orangeRed`,
            image: `https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png`,
            URL: `https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png`,
        },
        {
            title: `Node`,
            titleColor: `forestGreen`,
            image: `https://miro.medium.com/v2/resize:fit:720/format:webp/1*bc9pmTiyKR0WNPka2w3e0Q.png`,
            URL: `https://miro.medium.com/v2/resize:fit:720/format:webp/1*bc9pmTiyKR0WNPka2w3e0Q.png`,
        },
        {
            title: `Python`,
            titleColor: `blue`,
            image: `https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Python-logo-notext.svg/1200px-Python-logo-notext.svg.png`,
            URL: `https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Python-logo-notext.svg/1200px-Python-logo-notext.svg.png`,
        },
        {
            title: `BaZiPaiPai: Know Your Destiny`,
            titleColor: `black`,
            image: `https://store-images.s-microsoft.com/image/apps.26197.14261911708180816.c01bff75-7a55-49bc-bee2-a833cb67216d.21700488-d81b-48e0-bbf7-1d7f90afd071`,
            URL: `https://store-images.s-microsoft.com/image/apps.26197.14261911708180816.c01bff75-7a55-49bc-bee2-a833cb67216d.21700488-d81b-48e0-bbf7-1d7f90afd071`,
        },
      
    ],

    sectionList: [
        {
            'title': `Understanding the IoT Security Challenge`,
            'text': `IoT devices have become an integral part of our lives, from managing our homes to optimizing industrial processes. These devices collect and transmit sensitive data, making them attractive targets for cyber threats.`,
            'image': guitar,
        },
        {
            'title': `The IoT Threat Landscape`,
            'text': `Our web application is your gateway to a deeper understanding of the IoT threat landscape. With our cutting-edge analysis tools, you can gain insights into the vulnerabilities and risks associated with IoT devices.`,
            'image': event_phones,
        },
        {
            'title': `Explore the IoT Security Ecosystem`,
            'text': `Get instant access to a community of passionate event and concert-goers with our app! Chat with others before, during, and after the event to enhance your experience and create memories that last a lifetime.`,
            'image': foggy_blue,
        },
        {
            'title': `Stay Informed, Stay Secure`,
            'text': `With the rapid growth of IoT, it's crucial to stay informed about the evolving threat landscape. Our web application equips you with the knowledge and tools you need to protect your IoT devices and data.`,
            'image': purple_phones,
        },
        {
            'title': `Scan Your IoT Devices`,
            'text': `Ready to assess the security of your IoT devices? Click the "Scan" button below to initiate a comprehensive security scan. Our powerful scanning algorithms will provide you with a detailed report, highlighting potential vulnerabilities and offering recommendations for improvement.`,
            'image': purple_light,
        },
        {
            'title': `Empowering a Safer IoT Future`,
            'text': `we are committed to helping individuals and businesses navigate the complexities of IoT security. Join us in building a safer and more secure Internet of Things ecosystem.

            [Contact Us Button]
            
            Ready to take control of your IoT device security? Get started with our web application today!`,
            'image': concert_classic,
        },
    ],

    discordImage: discordImage,
    discordLink: 'https://discord.com/invite/aFQPYyAVDq',
}

const initialContext = {
    state: initialState,
    dispatch: () => null,
}

export const Context = React.createContext(initialContext)