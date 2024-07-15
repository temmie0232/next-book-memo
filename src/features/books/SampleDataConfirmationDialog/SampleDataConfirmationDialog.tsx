import React, { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { addSampleData } from '@/utils/sampleDataManager';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '~/firebase';

interface SampleDataConfirmationDialogProps {
    userId: string;
    onConfirm: () => void;
}

const SampleDataConfirmationDialog: React.FC<SampleDataConfirmationDialogProps> = ({ userId, onConfirm }) => {
    const [useSampleData, setUseSampleData] = useState(true);

    const handleConfirm = async () => {
        const userRef = doc(db, 'users', userId);
        if (useSampleData) {
            await addSampleData(userId);
        }
        await updateDoc(userRef, {
            isNewUser: false,
            initialized: true
        });
        onConfirm();
    };

    return (
        <Dialog open={true}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>サンプルデータを使用しますか？</DialogTitle>
                </DialogHeader>
                <Carousel>
                    <CarouselContent>
                        <CarouselItem>サンプルデータ解説画像1</CarouselItem>
                        <CarouselItem>サンプルデータ解説画像2</CarouselItem>
                        <CarouselItem>サンプルデータ解説画像3</CarouselItem>
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
                <div className="flex items-center space-x-2">
                    <Switch
                        checked={useSampleData}
                        onCheckedChange={setUseSampleData}
                    />
                    <span>
                        現在 : サンプルデータを
                        {useSampleData ? '使用する' : '使用しない'}
                    </span>
                </div>
                <Button onClick={handleConfirm}>
                    次のページへ
                </Button>
            </DialogContent>
        </Dialog>
    );
};

export default SampleDataConfirmationDialog;