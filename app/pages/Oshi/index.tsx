import React, { FC } from "react";
import { Alert } from "react-native";

import { RoutingPropsOfRoot } from "../../router/types";
import { RoutingPropsOfApp } from "../../router/app/types";
import { RoutingPropsOfOshi } from "../../router/app/Oshi/types";
import { ListItem } from "../../components/List";
import { Button } from "../../components/Button";
import { TrackButton } from "../../components/TrackButton";
import { Loading } from "../../components/Loading";

import { StyledList, StyledListWrap, StyledContentWrap, StyledWrap } from "./style";
import { useOshi } from "./hooks";

type Props = {
  rootRoute: RoutingPropsOfRoot<"app">;
  appRoute: RoutingPropsOfApp<"oshi">;
  oshiRoute: RoutingPropsOfOshi<"top">;
};

export const Oshi: FC<Props> = ({ oshiRoute }) => {
  const { oshis, isLoading, isLoadingDeletedOshi, onPressDeletedOshiButton } = useOshi();

  return (
    <>
      <StyledWrap>
        <StyledContentWrap>
          {isLoading ? (
            <Loading />
          ) : (
            <StyledListWrap>
              {oshis.map((oshi, idnex) => (
                <StyledList key={idnex}>
                  <ListItem
                    title={oshi.artists?.name || ""}
                    avatarUrl={oshi.image_url || ""}
                    bottomDivider={true}
                    onPress={() =>
                      oshiRoute.navigation.navigate("detail", {
                        id: oshi.id,
                        artistId: oshi.artist_id,
                        name: oshi.artists?.name || "",
                        color: oshi.color,
                        image: oshi.image_url || undefined,
                        isEditColor: oshi.is_edit_color,
                        memo: oshi.memo || undefined,
                      })
                    }
                    rightContent={
                      <Button
                        title="Delete"
                        onPress={() =>
                          Alert.alert("本当に削除してよろしいでしょうか？", "", [
                            {
                              text: "キャンセル",
                              onPress: () => console.log("User pressed No"),
                              style: "cancel",
                            },
                            {
                              text: "確定",
                              onPress: () => {
                                if (isLoadingDeletedOshi) return;
                                onPressDeletedOshiButton({ id: oshi.id });
                              },
                            },
                          ])
                        }
                        iconName="trash-o"
                        buttonStyle={{ minHeight: "100%", backgroundColor: "red" }}
                      />
                    }
                  />
                </StyledList>
              ))}
            </StyledListWrap>
          )}
        </StyledContentWrap>
        <TrackButton
          buttonText="追加"
          iconName="plus"
          onPress={() => {
            oshiRoute.navigation.navigate("edit");
          }}
        />
      </StyledWrap>
    </>
  );
};
