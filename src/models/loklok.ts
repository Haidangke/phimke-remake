export interface Home {
    page: number;
    searchKeyWord: string;
    recommendItems: Array<RecommendItem>;
}

export interface RecommendItem {
    bannerProportion: any;
    blockGroupNum: any;
    coverType: number;
    homeSectionId: number;
    homeSectionName: string;
    homeSectionType: string;
    recommendContentVOList: Array<RecommendContentVO>;
}

export interface RecommendContentVO {
    id: number;
    title: string;
    category: number;
    imageUrl: string;

    contentType?: string;
    jumpAddress?: string;
    jumpType?: string;
    needLogin?: boolean;
    resourceNum?: any;
    resourceStatus?: number;
    showMark?: boolean;
}

export type DefinitionList = Array<{
    code: string;
    description: string;
    fullDescription: string;
}>;

export type SubtitlingList = Array<{
    language: string;
    languageAbbr: string;
    subtitlingUrl: string;
    translateType: string;
}>;

export interface Detail {
    aliasName: string;
    areaList: Array<{
        id: number;
        name: string;
    }>;
    areaNameList: string[];
    category: 0;
    collect: boolean;
    coverHorizontalUrl: string;
    coverVerticalUrl: string;
    drameTypeVo: {
        drameName: string;
        drameType: string;
    };
    episodeCount: any;
    episodeVo: Array<{
        subtitlingList: SubtitlingList;
        definitionList: DefinitionList;
        id: number;
        name: string;
        resourceType: number;
        seriesNo: number;
        vid: string;
    }>;
    id: number;
    introduction: string;
    likeList: Array<{
        areaList: Array<{
            id: number;
            name: string;
        }>;
        areaNameList: string[];
        category: number;
        coverHorizontalUrl: string;
        coverVerticalUrl: string;
        drameTypeVo: any;
        id: number;
        name: string;
        score: number;
        tagList: Array<{
            id: number;
            name: string;
        }>;
        tagNameList: string[];
        upImgUrl: string;
        upName: string;
        year: number;
    }>;
    name: string;
    refList: Array<{
        category: number;
        coverHorizontalUrl: string;
        coverVerticalUrl: string;
        drameTypeVo: any;
        id: string;
        name: string;
        seriesNo: number;
    }>;
    reserved: boolean;
    score: number;
    seriesNo: number;
    showSetName: boolean;
    tagList: Array<{
        id: number;
        name: string;
    }>;
    tagNameList: string[];
    translateType: number;
    upInfo: {
        upId: number;
        upImgUrl: string;
        upName: string;
    };
    updateInfo: any;
    year: number;
}

export interface Media {
    businessType: number;
    episodeId: string;
    mediaUrl: string;
    currentDefinition: string;
    totalDuration: number;
}

export interface MediaParams {
    category: any;
    contentId: number;
    episodeId: number;
    definition: string;
}
