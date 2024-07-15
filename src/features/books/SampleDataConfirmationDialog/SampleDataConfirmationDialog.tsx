import React, { useState } from 'react';
import Image from 'next/image';
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

import a from "~/public/a.png";
import b from "~/public/b.png";
import c from "~/public/c.png";
import d from "~/public/d.png";
import e from "~/public/e.png";
import f from "~/public/f.png";
import g from "~/public/f.png";

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

    const carouselItems = [
        {
            image: a,
            alt: "サンプルデータ解説画像1",
            description: "事前に作成された本とジャンルで、アプリの利用方法を確認できます。有効にすると、サンプルの本が用意されます。このサンプルを参考にしながら、メモのつけ方や記録の仕方を理解し、どのように活用すべきかを把握できます。"
        },
        {
            image: b,
            alt: "サンプルデータ解説画像2",
            description: "サンプルの本を使って、ステータス(未読・読書中・完読)やジャンルによるソートの方法を学べます。サンプルの本を通じて、本の管理方法を理解できます。"
        },
        {
            image: c,
            alt: "サンプルデータ解説画像3",
            description: "サンプルの本を使って、検索バーでの検索や本の詳細をホバーして確認する機能を試すことができます。実際のデータを使うことで、直感的に理解できます。"
        },
        {
            image: d,
            alt: "サンプルデータ解説画像4",
            description: "サンプルの本を利用して、実際の本詳細ページでどのようにメモを取ることができるかを確認できます。実際のメモの取り方や情報の整理方法を学べます。"
        },
        {
            image: e,
            alt: "サンプルデータ解説画像5",
            description: "メモエリアでは、物語の大まかなストーリーなどをまとめるのに使えます。サンプルを参考に、効果的な要約や重要ポイントの記録方法を確認できます。"
        },
        {
            image: f,
            alt: "サンプルデータ解説画像6",
            description: "重要メモ機能では、物語の大まかなストーリーとは別に重要な情報をまとめられます。タイトルや内容での検索も可能で、必要な情報を簡単に確認できます。"
        },
        {
            image: g,
            alt: "サンプルデータ解説画像7",
            description: "登場人物メモ機能では、物語の大まかなストーリーとは別に登場人物の情報をまとめられます。キャラクターの特徴や関係性を整理し、物語の理解を深めるのに役立ちます。"
        }
    ];

    return (
        <Dialog open={true}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>サンプルデータを使用しますか？</DialogTitle>
                </DialogHeader>
                <Carousel className="w-full max-w-xs">
                    <CarouselContent>
                        {carouselItems.map((item, index) => (
                            <CarouselItem key={index}>
                                <div className="p-1">
                                    <p className="text-sm mb-2">{item.description}</p>
                                    <Image
                                        src={item.image}
                                        alt={item.alt}
                                        width={300}
                                        height={200}
                                        layout="responsive"
                                    />
                                </div>
                            </CarouselItem>
                        ))}
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