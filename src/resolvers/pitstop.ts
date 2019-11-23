import { firebaseAdmin } from "./../helpers/firebase";
import { CommentModel } from "./../models/comments";
import { PitstopModel } from "../models/pitstop";
import { PitstopImageModel } from "../models/image";
import axios from "axios";
import { Resolver, Query, Arg, Mutation } from "type-graphql";
import { Pitstop } from "../typeDefs/pitstop";
import { CommentType } from "../typeDefs/comment";
import { FieldResolver } from "type-graphql/dist/decorators/FieldResolver";
import { Root } from "type-graphql/dist/decorators/Root";
import { ImageType } from "../typeDefs/image";
import { Ctx } from "type-graphql/dist/decorators/Ctx";
import { GraphQLUpload } from "graphql-upload";
import { Upload } from "../types/Upload";
import { ID } from "type-graphql";

@Resolver()
export class GlobalPitstopResolver {
    @Query(() => [Pitstop])
    async Pitstops() {
        const ps = await PitstopModel.find({})
            .populate('images')
        return ps.map(p => ({
            ...p.toJSON(),
            id:p.id,
            images: p.get('images') ? p.get('images') : []
        }));
    }
    @Query(() => Pitstop, {nullable:true})
    async Pitstop(
        @Arg('id', () => ID)id:string
    ) {
        const ps = await PitstopModel
            .findById(id)
        if(!ps)return;
        return {
            name:ps.get('name'),
            id:ps.id,
            longitude:ps.get('longitude'),
            latitude: ps.get('latitude'),
            notes:ps.get('notes'),
            connection:ps.get('connection')
        }
    }

    @Mutation(() => Pitstop)
    async addPitstop(
        @Arg('name') name:string,
        @Arg('notes') notes:string,
        @Arg('connection') connection:number,
        @Arg('longitude') longitude:number,
        @Arg('latitude') latitude:number,
    ) {

        const user = false;
        if(!user)return;
        //const { name, notes, connection, longitude, latitude } = args;
        const ps = await PitstopModel.create({
            name,
            notes,
            connection,
            longitude,
            latitude,
            loc:{
                type: 'Point',
                coordinates: [longitude, latitude]
            }
        });
        axios.post('https://api.netlify.com/build_hooks/5dba2f194119749b9c512ebe');
        return ps.toJSON();
    }

    @Mutation(() => CommentType)
    async addPitstopComment(
        @Arg('id')id:string,
        @Arg('text')text:string,
        @Ctx(){user}:any,
    ) {
        if(!user) {
            return;
        }

        const comment = await CommentModel.create({
            type:'pitstop',
            linkedId:id,
            text:text,
            uid:user.uid,
        });

        return comment;
    }

    @Mutation(() => ImageType)
    async addPitstopImage(
        @Arg('image', () => GraphQLUpload)image:Upload,
        @Arg('id') id:string,
        @Ctx() { user }: any
    ) {
        if(!user)return;

        const { createReadStream, filename, mimetype } = await image;
        const url = `gs://nomad-pit-stops.appspot.com/`;

        const bucket = firebaseAdmin
            .storage()
            .bucket(url);

        const path = `pitstops/${id}/${Date.now()}-${filename}`;

        await new Promise(res => {
            createReadStream()
                .pipe(bucket.file(path).createWriteStream({
                    contentType:mimetype,
                    public:true,
                    metadata: {
                        custom: 'metadata'
                    }
                }))
                .on('close', res)
                .on('finish', res)
        });

        const sig = await bucket.file(path).getSignedUrl({
            expires:'2400',
            action:'read',
        });

        const psImage = await PitstopImageModel.create({
            uid: user.user_id,
            link: sig[0],
        });

        const ps:any = await PitstopModel.findById(id);

        const images = ps.images || [];
        const newImages = [
            ...images,
            psImage.get('id')
        ];
        await PitstopModel.findById(id)
            .update({
                images:newImages
            });

        return;
    }
}

@Resolver(() => Pitstop)
export class PitstopResolver {
    @FieldResolver(() => [CommentType])
    async comments(
        @Root() pitstop: Pitstop
    ) {
        return await CommentModel
            .find({
                linkedId:pitstop.id
            })
            .sort({createdAt:'desc'});
    }
    @FieldResolver(() => [ImageType], {nullable:true})
    async images(
        @Root() pitstop: Pitstop
    ) {
        const images =  await PitstopImageModel
            .find({
                linkedId:(pitstop as any)._id
            });
        return images;
    }
}
