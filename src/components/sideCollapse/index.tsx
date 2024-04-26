import React from 'react'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger
  } from "@/components/ui/sheet"
import Image from 'next/image'
import { Button } from '../ui/button'
  

const SideCollapse = ({open,setOpen}:{open:boolean,setOpen:any}) => {
  return (
    <Sheet open={open} onOpenChange={setOpen}>
    {/* <SheetTrigger>Open</SheetTrigger> */}
    <SheetContent>
      <SheetHeader>

<div className='flex justify-center items-center'>
<Image src={'https://github.com/shadcn.png'} alt={'pfp'} width={250} height={250} className='rounded-full' />
</div>


        <SheetTitle className='text-center'>Jehanzeb Siddiqui</SheetTitle>
        <SheetDescription className='text-center m-0 p-0'>
          (Web & App Developer)
        </SheetDescription>

<div className='my-2'>
        <hr className='my-1.5'/>
</div>

<div className=''>
        <SheetTitle className='text-left text-base font-medium mb-2'>Media , Files & Links</SheetTitle>
</div>


<div className='flex gap-3 justify-center items-center flex-wrap'>

<Image src={'https://github.com/shadcn.png'} alt={'gallery-image'} width={100} height={100} objectFit='contain' className='rounded' />
<Image src={'https://github.com/shadcn.png'} alt={'gallery-image'} width={100} height={100} objectFit='contain' className='rounded' />
<Image src={'https://github.com/shadcn.png'} alt={'gallery-image'} width={100} height={100} objectFit='contain' className='rounded' />
<Image src={'https://github.com/shadcn.png'} alt={'gallery-image'} width={100} height={100} objectFit='contain' className='rounded' />
<Image src={'https://github.com/shadcn.png'} alt={'gallery-image'} width={100} height={100} objectFit='contain' className='rounded' />
<Image src={'https://github.com/shadcn.png'} alt={'gallery-image'} width={100} height={100} objectFit='contain' className='rounded' />

</div>
<div className='text-center'>
<Button variant={"link"} className='mt-2'>See More</Button>
</div>


      </SheetHeader>
    </SheetContent>
  </Sheet>
  
  )
}

export default SideCollapse
